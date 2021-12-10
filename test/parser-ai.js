const PDFParser = require("./..");

const pdfParser = new PDFParser(this, 1);

pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', pdfData => {
  const fonts = pdfData.Meta.Metadata['xmptpg:fonts'];
  if (fonts) {
    const fontList = fonts.replace(/ /g, '').split('\n\n\n').map(font => font.split('\n')).map(font => ({
      fontName: font[0],
      fontFamily: font[1],
      fontFace: font[2],
      fontType: font[3],
      versionString: font[4],
      composite: font[5],
      fontFileName: font[6]
    }))
    console.log(fontList);
  } else {
    if(pdfData.Meta.PDFFormatVersion === '1.5'){
      const documentFonts = pdfData.Meta.documentFonts;
      const fontList = documentFonts.map(font => ({
        fontName: font,
      }))
      console.log(fontList);
    }
  }
});

// pdfParser.on("readable", meta => console.log("PDF Metadata", meta) );
// pdfParser.on("data", page => console.log(page ? "One page paged" : "All pages parsed", page));
// pdfParser.on("error", err => console.error("Parser Error", err) );

pdfParser.loadPDF('./test/测试-cdr.ai');


