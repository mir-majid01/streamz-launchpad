export const faqs = [
  { question: "What is StreamZ?", answer: "StreamZ is an Android app concept built around a more considered entertainment experience. This website is a design prototype; the capabilities shown here are intended features, not a working streaming service.", category: "General" },
  { question: "Where can I download the Android app?", answer: "A verified APK release will be linked on our Download page. Until that file is configured, the download button will show a clear availability notice. No release is provided with this prototype.", category: "Download" },
  { question: "How do I install an APK on Android?", answer: "Once a verified release is available, download the APK and open the file on your Android device. Android may ask you to authorize installing apps from that source. Review the prompt before continuing, and disable that permission afterwards if you no longer need it.", category: "Installation" },
  { question: "Which Android versions are supported?", answer: "Minimum Android version and device requirements have not been confirmed. Verified requirements will be published on the Download page with the release information.", category: "Installation" },
  { question: "Will StreamZ support offline downloads?", answer: "Offline downloads are an intended capability. Availability, eligibility and any limitations will need to be confirmed in the actual app release.", category: "Features" },
  { question: "Is StreamZ available on Google Play?", answer: "Store availability has not been confirmed. This prototype does not include a Play Store listing or store badge.", category: "Download" },
  { question: "The APK download is not starting. What should I do?", answer: "If you see the not-configured message, a verified APK has not been connected yet. Once a release is available, check your connection, available device storage and browser download permissions. Do not download replacement files from unverified sources.", category: "Troubleshooting" },
  { question: "How can I contact support?", answer: "Use the email link on this page. support@example.com is a placeholder address for this prototype and must be replaced with the real support contact before launch. Do not send personal or sensitive information to it.", category: "General" },
];

export function searchFaq(query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return faqs.filter((faq) => terms.every((term) => `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase().includes(term)));
}
