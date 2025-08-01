import { PROGRAMS_RU } from "../constants";
import { db } from "../db";

interface UpdateSubgroupsParams {
    subgroups: {
        relationId: number;
        subgroup: number;
    }[];
}

interface FetchSubgroupsParams {
    teacherId: number;
    courseId: number;
}

interface SubgroupStudent {
    relationId: number;
    studentName: string;
    subgroup: number;
}

interface Subgroup {
    subgroupName: string;
    students: SubgroupStudent[];
}

class SubgroupService {
    public async updateSubgroups(args: UpdateSubgroupsParams): Promise<void> {
        const {subgroups} = args;

        await Promise.all(
            subgroups.map((subgroup) =>
                db.teacher_Course_Student.update({
                    where: {
                        id: subgroup.relationId,
                    },
                    data: {
                        subgroup: subgroup.subgroup,
                    },
                })
            )
        );
    }
    
    public async fetchSubgroups(args: FetchSubgroupsParams): Promise<Subgroup[]>{
        const relations = await db.teacher_Course_Student.findMany({
            where: {
                teacherId: args.teacherId,
                courseId: args.courseId,
                archived: false,
                freezeVersionId: null
            },
            select: {
                student: true,
                id: true,
                subgroup: true,
            },
        });

        const subgroupsObject: Record<string, SubgroupStudent[]> = relations.reduce((acc, relation) => {
            if (!relation.student || relation.student.program === null) {
                return acc;
            }

            const key = relation.student.class + " " + PROGRAMS_RU[relation.student.program];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push({
                relationId: relation.id,
                studentName: relation.student.surname + " " + relation.student.name,
                subgroup: relation.subgroup ?? 0,
            });
            return acc;
        }, {} as Record<string, SubgroupStudent[]>);
    
        return Object.entries(subgroupsObject).map(([key, value]) => ({
            subgroupName: key,
            students: value,
        }));
    };
}

export const subgroupService = new SubgroupService();