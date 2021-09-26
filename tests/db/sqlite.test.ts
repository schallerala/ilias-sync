import avaModule, {TestInterface} from 'ava';
import {
    Connection,
    createConnection,
    getConnectionOptions,
    getRepository,
    Repository
} from 'typeorm';
import {BetterSqlite3ConnectionOptions} from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import { join } from 'path';
import {unlinkSync} from 'fs';

import {RefObject} from '../../src/entities/RefObject';
import {Resource} from '../../src/entities/Resource';
import {Course} from '../../src/ilias/models/Course';

const ava = <TestInterface<{
    connection: Connection;
    repository: Repository<RefObject>
    commonRef: RefObject
}>>avaModule;

const sqliteFile = join(__dirname, 'tmpDb.sqlite');

ava.before('Create connection', async t => {
    const defaultConnectionOptions = await getConnectionOptions();
    t.is(defaultConnectionOptions.type, 'better-sqlite3');

    const tempConnectionOptions: BetterSqlite3ConnectionOptions = {
        ...defaultConnectionOptions as BetterSqlite3ConnectionOptions,
        database: sqliteFile,
    }
    const connection = t.context.connection = await createConnection(tempConnectionOptions);
    const repo = t.context.repository = connection.getRepository(RefObject);
    t.context.commonRef = await repo.save(new RefObject(100, 'crs', null));
});

ava.after.always('Delete db file', async t => {
    const { connection } = t.context;
    await connection.close();
    unlinkSync(sqliteFile);
});

ava('Inserting ref object', async t => {
    const { repository } = t.context;

    const refObject = await repository.save(new RefObject(1, 'crs'));
    t.truthy(refObject);
    t.is(refObject.id, 1);
    t.is(refObject.type, 'crs');
    t.falsy(refObject.parent);
});
ava('Inserting resource', async t => {
    const repository = getRepository(Resource);
    const beforeResource = new Resource('exc', new Course(200, 'Course').asRootRefObject(), 'nowhere', null);
    const resource = await repository.save(beforeResource);
    t.truthy(resource);
    t.truthy(resource.id);
});
ava('Fetch entries', async t => {
    const { repository, commonRef } = t.context;

    const fetchRefObject = await repository.findOne(commonRef.id);
    t.is(fetchRefObject.id, 100);
    t.is(fetchRefObject.type, 'crs');
    t.falsy(fetchRefObject.parent);
});
ava('Removing entries', async t => {
    const { repository } = t.context;

    const refObject = await repository.save(new RefObject(2, 'exc'));
    t.truthy(refObject);

    const deleteResult = await repository.delete(2);
    t.truthy(deleteResult);
    t.is(deleteResult.affected, 1);
});
ava('Get repository from entity manager', async t => {
    const { connection, commonRef } = t.context;

    const repository = connection.manager.getRepository(RefObject);
    t.truthy(repository);

    const refObject = await repository.findOne(commonRef.id);
    t.truthy(refObject);
});
ava('Get repository from connection', async t => {
    const { connection, commonRef } = t.context;

    const repository = connection.getRepository(RefObject);
    t.truthy(repository);

    const refObject = await repository.findOne(commonRef.id);
    t.truthy(refObject);
});
ava('Get repository from exported method', async t => {
    const repository = getRepository(RefObject);
    t.truthy(repository);

    const refObject = await repository.findOne(t.context.commonRef.id);
    t.truthy(refObject);
});
