import TicketUtils from './TicketUtils.jsx';
//TODO: move xhr into query files
let PurchaseOrderQuery = function PurchaseOrderQuery(ticketPost) {
  this.query = {
    POId: ticketPost.poId, // PurchaseOrder Id
    PaymentModeId: '', // Either Provide Existing PaymentModeId or Provide Payment Details
    Amount: {
      Amount: ticketPost.count * 100, // Payment Amount
      Currency: 'USD' // 3 Letter ISO 4217 Currency Code Ex: USD, GBP, AUD
    },
    PaymentDate: '', // Payment Date in ISO 8601 Format (Ex. 2013-0621T05:32:07)
    PaymentMode: 3, // Choose your Payment Mode for Purchase Order: PayPal = 1, eCheck = 2, Check = 3, MoneyOrder = 4, Card = 5, Cash = 6, Credit = 7, COD = 8, BankTransfer = 9, DebitCard = 10, Other = 255
    PayPalEmail: '', // Paypal Email Address. Required if the Payment Option is PayPal (1)
    PayPalTransactionId: '', // PayPal Transaction Number. Required if the Payment Option is PayPal (1)
    Card: {
      CardType: 0, // MasterCard = 1, Discover = 2, Amex = 3, JCB=4, Visa = 6; Required if Payment Mode is set to Card (5)
      CardNumber: '', // Last Four Digits of the Credit Card. Required if the Payment Option is Card (5)
      CardExpiryMonth: 0, // Expiry Month of the Credit Card. Required if the Payment Option is Card (5)
      CardExpiryYear: 0, // Expiry Year of the Credit Card. Required if the Payment Option is Card (5)
      NameOnCard: '' // Name on the Credit Card. Required if the Payment Option is Card (5)
    },
    BankName: '', // Bank Name Required if the Payment Mode is BankTransfer (9)
    AccountNumber: 0, // Bank Account Number.Required if the Payment Mode is BankTransfer (9)
    Description: '', // Payment Description Required if the Payment Mode is other (0)
    Note: '', // Notes for payment
    ReferenceNo: '' // Reference number for payment
  };

  const queryProduct = '/POS/Invoices/UploadPDF ';
  this.uri = TicketUtils.API_HOST + queryProduct;
  this.signature = TicketUtils.generateSignature(queryProduct);
  this.token = TicketUtils.AUTH_TOKEN;
  this.version = TicketUtils.API_VERSION;
};

export default PurchaseOrderQuery;
