import React, { PropsWithChildren } from "react";

type UploadProps = {
    path: string;
};

function Upload({ path, children }: PropsWithChildren<UploadProps>) {
    const handleDownload = () => {
        const name = path.split('/').at(-1) as string;
        const link = document.createElement('a');
        link.href = path; // Укажите путь к файлу
        link.setAttribute('download', name); // Укажите имя файла и его расширение
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div onClick={handleDownload} role="presentation">
            {children}
            </div>
        </div>
    );
}

export { Upload };