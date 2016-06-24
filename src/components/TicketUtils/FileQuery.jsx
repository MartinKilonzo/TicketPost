import TicketUtils from './TicketUtils.jsx';
//TODO: move xhr into query files
let FileQuery = function FileQuery(ticketPost) {
  this.query = {
    Files: [],
    ItemId: ticketPost.itemId
  };
  this.addFile = function addFile(seat, file) {
    this.query.Files.push({Seat: seat.toString(), File: file});
  };
  const queryProduct = '/POS/Purchases/UploadPDF ';
  this.uri = TicketUtils.API_HOST + queryProduct;
  this.signature = TicketUtils.generateSignature(queryProduct);
  this.token = TicketUtils.AUTH_TOKEN;
  this.version = TicketUtils.API_VERSION;
};

export default FileQuery;
