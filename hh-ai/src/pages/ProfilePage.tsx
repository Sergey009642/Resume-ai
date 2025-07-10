import React, {useEffect, useMemo, useState} from "react";
import {Avatar, Button, Card, Col, Image, message, Modal, Pagination, Row, Typography} from "antd";
import {DeleteOutlined, DownloadOutlined, EditOutlined} from "@ant-design/icons";
import {useUnit} from "effector-react";
import * as userModel from "../model/user";
import * as resumeModel from "../model/resume";
import {useNavigate} from "react-router";


const {Text, Title} = Typography;

const ProfileDocuments: React.FC = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = React.useState<"date_desc" | "date_asc" | "title_asc" | "title_desc">("date_desc");

    const pageSize = 3;
    const [userInfo, isAuth, isLoading, resumeListRequested, resumeList, resumeClicked, resumeDeleteClicked, totalResumes, currentPageStore, isResumeDownloading, downloadResumeByIdWithFormatClicked] = useUnit([
        userModel.$userInfo,
        userModel.$isAuth,
        userModel.$isLoading,
        resumeModel.resumeListRequested,
        resumeModel.$resumeList,
        resumeModel.resumeClicked,
        resumeModel.resumeDeleteClicked,
        resumeModel.$totalResumes,
        resumeModel.$currentPage,
        resumeModel.$isResumeDownloading,
        resumeModel.downloadResumeByIdWithFormatClicked
    ]);

    // Данные профиля
    const profile = useMemo(() => {
        return {
            name: [
                userInfo?.firstName?.toUpperCase(),
                userInfo?.lastName?.toUpperCase(),
                userInfo?.middleName?.toUpperCase(),
            ]
                .filter(Boolean)
                .join(" ") || "ФИО не указано",
            position: userInfo?.about || "Пока не указано...",
            email: userInfo?.email || "Email не указано",
            phone: userInfo?.phone || "Телефон не указан",
            avatar: "https://via.placeholder.com/100",
        };
    }, [userInfo])

    useEffect(() => {
        if (isAuth) {
            resumeListRequested({page: currentPage, pageSize});
        }
    }, [isAuth, currentPage, pageSize, resumeListRequested]);

    if (isLoading) {
        return null
    }

    return (
        <div style={{maxWidth: 1000, margin: "auto", marginTop: 20, padding: 20}}>
            {/* Блок профиля */}
            <Card
                style={{
                    background: "#EAF4FC",
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 20,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
            >
                <Row align="middle">
                    <Col flex="100px" style={{marginRight: 20}}>
                        <Avatar size={100} src={profile.avatar}/>
                    </Col>
                    <Col flex="auto">
                        <Title level={3} style={{marginBottom: 5}}>{profile.name}</Title>
                        <Text type="secondary">{profile.position}</Text>
                        <div style={{marginTop: 10}}>
                            <Text>Email: {profile.email}</Text> <br/>
                            <Text>Телефон: {profile.phone}</Text>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Основная часть с документами */}
            <div style={{display: "flex"}}>
                {/* Левая колонка с категориями */}
                <div style={{width: 200, paddingRight: 20}}>
                    <Title level={3}>My Documents</Title>
                    <Button type="primary" block style={{marginBottom: 10}}>
                        Resumes
                    </Button>
                    <Button
                        block
                        onClick={() => navigate("/")}
                    >
                        🪄 Create magic resume
                    </Button>

                </div>

                {/* Центральный контент с документами */}
                <div style={{flex: 1}}>
                    <div style={{display: "flex", justifyContent: "flex-end", marginBottom: 16}}>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as any)}
                            style={{padding: 6, borderRadius: 4}}
                        >
                            <option value="date_desc">Сначала новые</option>
                            <option value="date_asc">Сначала старые</option>
                            <option value="title_asc">По названию (А–Я)</option>
                            <option value="title_desc">По названию (Я–А)</option>
                        </select>
                    </div>

                    <Row gutter={[16, 16]}>

                        {[...resumeList]
                            .sort((a, b) => {
                                switch (sortOrder) {
                                    case "date_asc":
                                        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
                                    case "date_desc":
                                        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                                    case "title_asc":
                                        return a.title.localeCompare(b.title);
                                    case "title_desc":
                                        return b.title.localeCompare(a.title);
                                    default:
                                        return 0;
                                }
                            })
                            .map((resume) => (

                                <Col span={24} key={resume.id}>
                                    <Card
                                        styles={{
                                            cover: {
                                                display: "flex",
                                                alignItems: "center",
                                                padding: 15,
                                                borderRadius: 8,
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                                boxSizing: "border-box",
                                            },
                                            body: {
                                                width: '100%',
                                            }
                                        }}
                                    >
                                        <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                                            {/* Мини-превью документа */}
                                            <div
                                                style={{
                                                    width: 120,
                                                    height: 150,
                                                    background: "#f0f0f0",
                                                    borderRadius: 5,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginRight: 15
                                                }}
                                            >
                                                <Image src={resume.preview || ""}/>
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                flex: "1 1 0",
                                                alignSelf: "stretch"
                                            }}>
                                                {/* Кнопки действий */}
                                                <div style={{display: "flex", gap: 10, alignSelf: "flex-end"}}>
                                                    <Button
                                                        icon={<EditOutlined/>}
                                                        onClick={() => {
                                                            resumeClicked(resume.id)
                                                            navigate("/")
                                                        }}
                                                    />
                                                    {resume.hasHtmlContent && (
                                                        <Button
                                                            icon={<DownloadOutlined/>}
                                                            onClick={() => setSelectedResumeId(resume.id)}
                                                        />
                                                    )}
                                                    <Button
                                                        danger icon={<DeleteOutlined/>}
                                                        onClick={() => {
                                                            Modal.confirm({
                                                                title: "Удалить резюме?",
                                                                content: "Вы уверены, что хотите удалить это резюме? Это действие необратимо.",
                                                                okText: "Удалить",
                                                                okType: "danger",
                                                                cancelText: "Отмена",
                                                                centered: true,
                                                                onOk: async () => {
                                                                    await resumeDeleteClicked(resume.id);
                                                                    message.success("Резюме удалено!");

                                                                    resumeListRequested({page: currentPage, pageSize});
                                                                }
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <Modal
                                                    afterClose={() => setSelectedResumeId(null)}
                                                    footer={null}
                                                    closable
                                                    open={!!selectedResumeId}
                                                    onCancel={() => setSelectedResumeId(null)}
                                                    title={"Выберите формат для скачивания"}>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 10,
                                                        marginTop: 10
                                                    }}>
                                                        <Button
                                                            loading={isResumeDownloading}
                                                            onClick={() => {
                                                                if (!selectedResumeId) return;
                                                                downloadResumeByIdWithFormatClicked({
                                                                    resumeId: selectedResumeId,
                                                                    format: "html"
                                                                });
                                                            }}
                                                        >
                                                            HTML
                                                        </Button>
                                                        <Button
                                                            loading={isResumeDownloading}
                                                            onClick={() => {
                                                                if (!selectedResumeId) return;
                                                                downloadResumeByIdWithFormatClicked({
                                                                    resumeId: selectedResumeId,
                                                                    format: "pdf"
                                                                });
                                                            }}
                                                        >
                                                            PDF
                                                        </Button>
                                                        <Button
                                                            loading={isResumeDownloading}
                                                            onClick={() => {
                                                                if (!selectedResumeId) return;
                                                                downloadResumeByIdWithFormatClicked({
                                                                    resumeId: selectedResumeId,
                                                                    format: "docx"
                                                                });
                                                            }}
                                                        >
                                                            DOCX
                                                        </Button>
                                                    </div>
                                                </Modal>

                                                <Title level={5}>{resume.title}</Title>

                                                <Text type="secondary">
                                                    Updated: {new Date(resume.updatedAt).toString()}
                                                </Text>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalResumes}
                        onChange={(page) => setCurrentPage(page)}
                        style={{marginTop: 20, textAlign: "center"}}
                        showSizeChanger={false}
                    />
                    <div style={{marginTop: 30, textAlign: "center"}}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate("/")}
                            icon={<EditOutlined/>}
                        >
                            Create magic resume
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDocuments;
