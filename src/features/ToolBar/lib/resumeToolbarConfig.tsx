
export const resumeToolbarConfig = [
    {
      id: "personalInfo",
      cardName: "Personal Information",
      type: "form",
      icon:<img src="/div (1).png" alt="icon"  />,
      fields: [
        {
          fieldName: "Имя",
        },
        {
          fieldName: "Фамилия",
        },
        {
          fieldName: "Должность",
        },
        {
          fieldName: "Образование",
        },
        {
          fieldName: "Местоположение",
        },
        {
          fieldName: "Адрес Email",
        },
        {
          fieldName: "Опыт",
        },
        {
          fieldName: "Описание",
        },
      ],
      isCollapsed: true,
    },
    {
      id: "education",
      cardName: "Education",
      type: "form",
      icon:<img src="/div (2).png" alt="icon"  />,
      fields: [
        {
          fieldName: "Имя",
        },
        {
          fieldName: "Фамилия",
        },
        {
          fieldName: "Должность",
        },
        {
          fieldName: "Образование",
        },
        {
          fieldName: "Местоположение",
        },
        {
          fieldName: "Адрес Email",
        },
        {
          fieldName: "Опыт",
        },
        {
          fieldName: "Описание",
        },
      ],
      isCollapsed: true,
    },
    {
      id: "workExpirience",
      cardName: "Work Experience",
      type: "form",
      icon:<img src="/div (3).png" alt="icon"  />,
      fields: [
        [
          {
            fieldName: "Наименование компаи",
          },
          {
            fieldName: "Должность",
          },
          // {
          //   fieldName: "Город",
          //   value: "",
          // },
          // {
          //   fieldName: "Страна",
          //   value: "",
          // },
          {
            fieldName: "С",
          },
          {
            fieldName: "По",
          },
          {
            fieldName: "Описание",
          },
        ],
      ],
      isCollapsed: false,
    },
    {
      id: "skills",
      cardName: "Skills",
      type: "select",
      icon:<img src="/div (4).png" alt="icon"  />,
      fields: [],
      isCollapsed: false,
    },
    // {
    //   id: "strengths",
    //   cardName: "Сильные стороны",
    //   icon: <BulbOutlined style={{ fontSize: "22px" }} />,
    //   type: "select",
    //   fields: [
    //     "Стрессоустойчивый",
    //     "Гибкий",
    //     "Работа в команде",
    //     "Пунктуальный",
    //   ],
    //   isCollapsed: false,
    // },
  ];