import { Banner } from '../components';

const privacyPolicy = () => (
  <div className="flex justify-center sm:px-4 p-12">
    <div className="w-full minmd:w-4/5">
      {/* <h1 className="font-poppins dark:text-white text-nft-black-1 text-4xl minlg:text-5xl font-semibold ml-4 xs:ml-0">What is an NFT?</h1> */}
      <Banner
        name={(<>Privacy Policy</>)}
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        parentStyle="justify-start mb-7 h-32 sm:h-14 p-12 xs:p-4 xs:h-17 rounded-3xl"
      />
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        Effective Date: 09/13/2023<br /><br />

        Thank you for using EverTraded.com. This Privacy Policy explains how we collect, use, and protect your personal information when you use our NFT marketplace. By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree with the terms, please do not use our platform.<br /><br />

        <span className="font-bold">1. Information We Collect</span><br /><br />

        a. <span className="font-bold">Personal Information:</span> We may collect information that can identify you directly or indirectly, such as your name, email address, and contact information, when you register or interact with our platform.<br /><br />

        b. <span className="font-bold">Transaction Information:</span> When you engage in transactions on EverTraded.com, we may collect information related to those transactions, including transaction data and payment details.<br /><br />

        c. <span className="font-bold">Usage and Device Information:</span> We automatically collect information about how you access and use our platform, including your IP address, device type, and browser information.<br /><br />

        2. <span className="font-bold">How We Use Your Information</span><br /><br />

        We may use your information for the following purposes:<br /><br />

        a. <span className="font-bold">Provide and Maintain Services:</span> To provide and maintain our NFT marketplace, process transactions, and offer customer support.<br /><br />

        b. <span className="font-bold">Improve Our Services:</span> To analyze usage patterns and improve the functionality and user experience of EverTraded.com.<br /><br />

        c. <span className="font-bold">Communicate:</span> To send you important information about our services, respond to your inquiries, and send you marketing communications if you have opted in.<br /><br />

        3. <span className="font-bold">Sharing Your Information</span><br /><br />

        a. <span className="font-bold">Service Providers:</span> We may share your information with third-party service providers who help us operate our platform and provide related services.<br /><br />

        b. <span className="font-bold">Legal Compliance:</span> We may disclose your information to comply with legal obligations or protect our rights and the rights of others.<br /><br />

        4. <span className="font-bold">Data Security</span><br /><br />

        We implement reasonable security measures to protect your data, but no method of transmission or storage is entirely secure. We cannot guarantee the absolute security of your information.<br /><br />

        5. <span className="font-bold">Your Choices</span><br /><br />

        a. <span className="font-bold">Account Information:</span> You can access and update certain account information through your account settings. You may also delete your account, but certain information may be retained as required by law.<br /><br />

        b. <span className="font-bold">Marketing Communications:</span> You can opt out of receiving marketing communications from us by following the instructions in those communications or by contacting us.<br /><br />

        <span className="font-bold">6. Changes to this Privacy Policy</span><br /><br />

        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of EverTraded.com after the changes constitute acceptance of the updated Privacy Policy.<br /><br />

        <span className="font-bold">7. Contact Us</span><br /><br />

        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at info@evertraded.com.
      </p>
    </div>
  </div>

);
export default privacyPolicy;
