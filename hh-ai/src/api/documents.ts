export const downloadPDF = async (htmlContent: string) => {
    try {
        const response = await fetch('/api/makepdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({html: htmlContent}),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'out.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

export const downloadDOCX = async (htmlContent: string) => {
    try {
        const response = await fetch('/api/makedocx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({html: htmlContent}),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'out.docx';
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};