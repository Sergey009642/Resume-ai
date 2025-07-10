import {createDomain, sample} from "effector";
import {ID, Resume, ResumeShort} from "../types/resume";
import {
    deleteResume,
    downloadResumeByIdWithFormat,
    DownloadResumeByIdWithFormatInput,
    getResumeById,
    getResumeList
} from "../api/resume";
import {mapResume} from "./mappers/mapResume";

const domain = createDomain("resume")

export const resumeCreated = domain.createEvent<ID>()

export const resumeClicked = domain.createEvent<ID>()

export const resumeDeleteClicked = domain.createEvent<ID>()

export const resumeListRequested = domain.createEvent<{ page: number; pageSize: number }>()

export const downloadResumeByIdWithFormatClicked = domain.createEvent<DownloadResumeByIdWithFormatInput>()

export const $resumeId = domain.store<ID | null>(null)
    .on(resumeCreated, (_, id) => {
        return id
    })
    .on(resumeClicked, (_, id) => {
        return id
    })

export const fetchResumeListFx = domain.createEffect<{ page: number; pageSize: number }, any>(getResumeList)

export const fetchResumeByIdFx = domain.createEffect(getResumeById)

export const deleteResumeByIdFx = domain.createEffect(deleteResume)

export const downloadResumeByIdWithFormatFx = domain.createEffect(downloadResumeByIdWithFormat)

export const $resume = domain.store<Omit<Resume, "id"> | null>(null)

export const $resumeHtmlContent = domain.store<string | null>(null)

export const $resumeList = domain.store<ResumeShort[]>([])
    .on(fetchResumeListFx.done, (_, {result}) => {
        if (result?.resumes) {
            return result.resumes.map(mapResume);
        }
        return [];
    });

export const $isResumeDownloading = downloadResumeByIdWithFormatFx.pending

export const $totalResumes = domain.store<number>(0)
    .on(fetchResumeListFx.done, (_, {result}) => {
        return result?.total || 0;
    });

export const $currentPage = domain.store<number>(1)
    .on(fetchResumeListFx.done, (_, {params}) => {
        return params.page;
    });

sample({
    clock: resumeListRequested,
    target: fetchResumeListFx,
})

sample({
    clock: downloadResumeByIdWithFormatClicked,
    target: downloadResumeByIdWithFormatFx,
})

sample({
    clock: resumeClicked,
    target: fetchResumeByIdFx,
})

sample({
    clock: fetchResumeByIdFx.done,
    fn: ({result}) => {
        if (result) {
            return result
        }

        return null
    },
    target: $resume,
})

sample({
    clock: fetchResumeByIdFx.done,
    fn: ({result}) => {
        if (result) return result.htmlContent

        return null
    },
    target: $resumeHtmlContent,
})

sample({
    clock: resumeDeleteClicked,
    target: deleteResumeByIdFx,
})

sample({
    clock: deleteResumeByIdFx.done,
    source: {currentPage: $currentPage, totalResumes: $totalResumes},
    fn: ({currentPage, totalResumes}) => {
        const pageSize = 3;
        // Если текущая страница пустая (или больше нет резюме), возвращаемся на первую
        const lastPageNumber = Math.ceil(totalResumes / pageSize) || 1;
        const newPage = currentPage === lastPageNumber ? currentPage - 1 : currentPage;
        return {page: newPage, pageSize};
    },
    target: fetchResumeListFx,
})
