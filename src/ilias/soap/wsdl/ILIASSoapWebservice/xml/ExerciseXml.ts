export interface ExerciseRoot {
    Exercise: {
        attributes: {
            obj_id: string
            owner: string
        }
        Title: string
        Description: string
        Assignment: Assignment
    }
}

export interface Assignment {
    Instruction: string
    DueDate: string
    /**
     * TODO: https://mantis.ilias.de/view.php?id=29564
     */
    Files: any
}
