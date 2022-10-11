const Sib = require('sib-api-v3-sdk');
const { SB_API_KEY, SB_EMAIL } = require('./constants');

exports.sendWelcomeMessage = async (receiverEmail) => {
  try {
    if (SB_API_KEY && SB_EMAIL) {
      const Client = Sib.ApiClient.instance;
      const apiKey = Client.authentications['api-key'];
      apiKey.apiKey = SB_API_KEY;
      const tranEmailApi = new Sib.TransactionalEmailsApi();
      const sender = {
        email: SB_EMAIL,
        name: 'Disney API',
      };
      const receivers = [{ email: receiverEmail }];
      tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Welcome!',
        textContent: `You have been succesfully registered, now you have access to all the functionalities of the application. 
        
        The Disney API team.`,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
