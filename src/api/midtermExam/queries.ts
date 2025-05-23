import {Resolver} from '../../@types/resolver';

type FetchArgs = {
  teacherId: number;
  year: number;
  typeId: number;
  dateGte: string;
  dateLte: string;
}

const fetchMidtermExams: Resolver<FetchArgs> = async (_, {teacherId, year, typeId, dateGte, dateLte}, {prisma}) => {
  return await prisma.midtermExam.findMany({
    where: {
      teacherId,
      deleted: false,
      typeId,
      date: {
        gte: dateGte,
        lte: dateLte
      }
    },
    orderBy: {
      date: 'desc'
    },
    include: {
      student: true,
      type: true
    }
  })
}

const fetchMidtermExamTypes: Resolver<any> = async (_, args, {prisma}) => {
  return await prisma.midtermExamType.findMany({
    where: {
      deleted: false
    }
  })
}

module.exports = {fetchMidtermExams, fetchMidtermExamTypes};