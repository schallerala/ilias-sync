import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {RefType} from '../ilias/soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';

@Entity()
export class RefObject {

    @PrimaryColumn()
    readonly id: number;

    @Column()
    readonly type: RefType;

    @OneToOne(() => RefObject, {
        nullable: true,
        cascade: true
    })
    @JoinColumn()
    readonly parent: RefObject;


    constructor(id: number, type: RefType, parent?: RefObject | undefined) {
        this.id = id;
        this.type = type;
        this.parent = parent;
    }
}
