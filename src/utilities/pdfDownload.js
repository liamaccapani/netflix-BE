import PdfPrinter from "pdfmake";

export const getPDFReadabaleStream = (media) => {
    const fonts = {
        Roboto: {
            normal: "Helvetica", 
            bold: "Helvetica-Bold"
        }
    }


    const printer = new PdfPrinter(fonts)

    const docDefinition = {
        content: [
            {text: media.Title, style: "header" },
            {text: media.Year, style: "subtitle"},
            {text: media.Type, style: "subtitle"},
            // {text: media.reviews}
        ], 

        styles: {
            header: {
                fontSize: 22,
                bold: true
            },

            subtitle: {
                fontSize: 18
            }
        }
    }

    const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
    pdfReadableStream.end()

    return pdfReadableStream
}
