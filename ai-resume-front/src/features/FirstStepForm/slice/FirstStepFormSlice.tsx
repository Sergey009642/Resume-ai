import {
  ProfessionalExperience,
  ResumeData,
} from "@entities/resumes/ResumeTemplate1/api/types";
import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";
const initialState = {
  // $firstStepData: atomWithImmer<FirstStepData | null>(null),
  $resumePhoto: atom<File | null>(null),
  $resumeData: atomWithImmer<ResumeData | null>(null),
  $resumePreset: atomWithImmer<number | null>(null),
  $resumeAvailableSteps: atomWithImmer<number[]>([]),
  $currentResumeStep: atomWithImmer<number>(0),
  $isAfterGeneration: atomWithImmer<boolean>(false),
  
};

export const StepFormSlice = {
  initialState,
  selectors: {
    $validateFirstStepRequiredFields: atom((get) => {
      const requiredFields = ["name", "role", "email"];
      const resumeData = get(initialState.$resumeData);

      return requiredFields.every(
        (field) =>
          resumeData?.[field as keyof ResumeData] !== undefined &&
          resumeData?.[field as keyof ResumeData] !== ""
      );
    }),

    $validateThirdStepRequiredFields: atom((get) => {
      return get(initialState.$resumePreset) !== null && get(initialState.$resumeData) !== null;
    }),

    // $validateSecondStepRequeredFields: atom((get) => {
    //   const requiredFields = [
    //     "Наименование компании",
    //     "Должность",
    //     "С",
    //     "По",
    //   ];
    //   const cardData = get(initialState.$cardsData);
    //   const index = cardData.findIndex((el) => el.id === "workExpirience");

    //   return requiredFields.every((field) => {
    //     const ind = (cardData[index].fields as FieldType[][])[0].findIndex(
    //       (el) => el.fieldName === field
    //     );
    //     return (
    //       (cardData[index].fields as FieldType[][])[0][ind].value.length > 0 &&
    //       (cardData[index].fields as FieldType[][])[0][ind].value !== undefined
    //     );
    //   });
    // }),
  },
  actions: {
    $onFirstStepMutation: atom(
      null,
      (
        get,
        set,
        payload: {
          field: keyof ResumeData; // Может быть как keyof ResumeData, так и путь к полю в массиве
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: any;
          index?: number; // Опциональный индекс для массива
          subField?: string; // Опциональное поле в объекте массива
        }
      ) => {
        const { field, data, index, subField } = payload;

        set(initialState.$resumeData, (draft) => {
          // Если есть index и subField, значит работаем с массивом объектов
          if (typeof index !== "undefined" && subField) {
            // Проверяем, что поле является массивом
            if (Array.isArray((draft as ResumeData)[field])) {
              // Создаем копию массива с измененным объектом
              const newArray = [
                ...(draft as ResumeData)[field],
              ] as ProfessionalExperience[];
              newArray[index] = {
                ...newArray[index],
                [subField]: data,
              };
              return {
                ...draft,
                [field]: newArray,
              };
            }
          }

          // Стандартное поведение для простых полей
          return {
            ...draft,
            [field]: data,
          };
        });
      }
    ),

    $handleWriteProfessionalExperienceChangeIndex: atom(
      null,
      (
        get,
        set,
        payload: {
          index: number;
          property: keyof ProfessionalExperience;
          value: any;
        }
      ) => {
        const { index, property, value } = payload;
        set(initialState.$resumeData, (draft) => {
          if (draft) {
            // draft.professionalPath = payload
            draft.professionalPath[index][property] = value;
          }
          // return {
          //   ...draft,
          //   professionalExperience: payload
          // };
        });
      }
    ),

    $handlePhotoDeleteMutation: atom(null, (get, set) => {
      set(initialState.$resumePhoto, null);
    }),

    $onResumePresetChangeMutation: atom(null, (get, set, payload: number) => {
      set(initialState.$resumePreset, payload);
    }),

    $fillResumeByAiMutation: atom(null, (get, set, payload: ResumeData) => {
      set(initialState.$resumeData, (draft) => {
        const education = draft?.educationDetails
          ? draft.educationDetails
          : null;
        return {
          ...payload,
          educationDetails: education,
        };
      });
      set(initialState.$isAfterGeneration, true);
    }),

    $handleUpdateResumeDataMutation: atom(null, (get, set, payload: ResumeData) => {
      set(initialState.$resumeData, payload);

      // set(initialState.$resumeData, (draft)  => {
      //   fieldsToClear.forEach((field) => {
      //     draft[field] = '';
      //     // draft[field] = null;
      //   })
      // })
    }),

    $handleSetResumePhoto: atom(null, (get, set, payload: File | null) => {
      set(initialState.$resumePhoto, payload);
    }),

    $onAddWorkExpirienceButtonClick: atom(null, (get, set) => {
      set(initialState.$resumeData, (draft) => {
        const newData = { ...draft };

        if (!newData.professionalPath) {
          newData.professionalPath = [];
        }

        newData.professionalPath = [
          ...newData.professionalPath,
          {
            name: "",
            role: "",
            startWork: "",
            endWork: "",
            achievements: [],
            responsibilities: [],
            description: "",
          },
        ];

        return newData;
      });
    }),

    $onDeleteWorkExpirienceButtonClick: atom(
      null,
      (get, set, payload: number) => {
        set(initialState.$resumeData, (draft) => {
          return {
            ...draft,
            professionalPath: draft?.professionalPath.filter(
              (el, i) => i !== payload
            ),
          };
        });
      }
    ),

    $onAddEducationButtonClick: atom(null, (get, set) => {
      set(initialState.$resumeData, (draft) => {
        const newData = { ...draft };

        // Если professionalPath не существует, инициализируем его
        if (!newData.educationDetails) {
          newData.educationDetails = [];
        }

        // Добавляем новый элемент через spread (без мутации)
        newData.educationDetails = [
          ...newData.educationDetails,
          {
            name: "",
            faculty: "",
            speciality: "",
            endYear: "",
            level: 'bachelor',
          },
        ];

        return newData;
      });
    }),

    $onDeleteEducationButtonClick: atom(null, (get, set, payload: number) => {
      set(initialState.$resumeData, (draft) => {
        return {
          ...draft,
          educationDetails: draft?.educationDetails.filter(
            (el, i) => i !== payload
          ),
        };
      });
    }),

    $handleResumeStepChange: atom(null, (get, set, payload: number) => {
      const isAfterAiGeneration = get(initialState.$isAfterGeneration);

      const allowGoSecond = get(
        StepFormSlice.selectors.$validateFirstStepRequiredFields
      );
      const allowGoFourth = get(
        StepFormSlice.selectors.$validateThirdStepRequiredFields
      );
      const allowGoThird = get(
        StepFormSlice.selectors.$validateFirstStepRequiredFields
      );

      const currentStep = get(initialState.$currentResumeStep);

      if (
        (payload === 1 && allowGoSecond) ||
        payload === 2  ||
        (payload === 3 && allowGoThird ) ||
        (payload === 4 && allowGoFourth && isAfterAiGeneration) ||
        currentStep >= payload
      ) {
        set(initialState.$currentResumeStep, payload);
      }
    }),
  },
};
