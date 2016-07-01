import TicketUtils from './TicketUtils.jsx';
//TODO: move xhr into query files
let FileQuery = function FileQuery(itemId, files) {
  this.query = {
    Files: files,
    ItemId: itemId
  };
  const queryProduct = '/POS/Purchases/UploadPDF';
  return new TicketUtils.Query('POST', queryProduct, this.query);
};

export default FileQuery;
