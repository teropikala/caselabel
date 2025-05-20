## Background

This project is a website to generate labels for Makita MakPac tool
cases. Users can select correct case size and tool model to
initially populate the dialogs. There's also space for custom
details like owners name and contact details.

Information entered is only saved to cookies and there is no backend
implementation.


## Architecture and tooling

React: Front end components
Tailwind CSS: Styling
pdf-lib: PDF generation


## Deployment

Application code is deployed into AWS S3 bucket and served via
Amazon CloudFront CDN.


## Features


1. Select MakPac case type (3 options)
2. Select Makita tool
3. Enter optional custom details
4. Download generated PDF 


