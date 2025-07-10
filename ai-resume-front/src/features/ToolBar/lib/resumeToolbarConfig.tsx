import { AuditOutlined, BankOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";

export const resumeToolbarConfig = [
    {
      id: "personalInfo",
      cardName: "Личная информация",
      type: "form",
      icon: <UserOutlined style={{ fontSize: "22px" }} />,
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
      cardName: "Образование",
      type: "form",
      icon: <AuditOutlined  style={{ fontSize: "22px" }} />,
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
      cardName: "Опыт работы",
      type: "form",
      icon: <BankOutlined style={{ fontSize: "22px" }} />,
      fields: [
        [
          {
            fieldName: "Наименование компании",
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
      cardName: "Навыки",
      type: "select",
      icon: <StarOutlined style={{ fontSize: "22px" }} />,
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