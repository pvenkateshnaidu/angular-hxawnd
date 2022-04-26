import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  convertToPdf() {
    //WORKING EXAMPLE IS HERE
    let html1 = document.querySelector('.printformClass');
    html2canvas(document.querySelector('.printformClass')).then((canvas) => {
      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');
    });

    //MULTIPLE PAGES EXAMPLE IS COMMENTED HERE
    // html2canvas(document.querySelector(".printformClass")).then(canvas => {

    //   let totalPages = canvas.height / 842;
    //   var pdf = new jsPDF('p', 'pt', [canvas.width, 842]);
    //   console.log(pdf);
    //   for (let i = 1; i <= totalPages; i++) {
    //     var imgData = canvas.toDataURL("image/jpeg", 1.0);
    //     pdf.addImage(imgData, 0, 0, canvas.width, 842 * i);
    //     pdf.addPag(canvas.width, 842 * i);
    //   }
    //   pdf.save('converteddoc.pdf');
    // })
  }

  getPDF() {
    html2canvas(document.querySelector('.printformClass')).then(function (
      canvas
    ) {
      canvas.getContext('2d');
      var HTML_Width = canvas.width;
      var HTML_Height = canvas.height;
      var top_left_margin = 15;
      var PDF_Width = HTML_Width + top_left_margin * 2;
      var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;

      var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      console.log(canvas.height + '  ' + canvas.width);

      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(
        imgData,
        'JPG',
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );

      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        let margin = -(PDF_Height * i) + top_left_margin * 4;
        if (i > 1) {
          margin = margin + i * 8;
        }
        console.log(top_left_margin);
        console.log(top_left_margin);
        console.log(-(PDF_Height * i) + top_left_margin * 4);
        pdf.addImage(
          imgData,
          'JPG',
          top_left_margin,
          margin,
          canvas_image_width,
          canvas_image_height
        );
      }

      pdf.save('HTML-Document.pdf');
    });
  }
}
