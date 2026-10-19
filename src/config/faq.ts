import { site } from "./site";

export const faqs = [
  {
    question: "What is StreamZ?",
    answer:
      "StreamZ is an Android entertainment app. It brings films, series and live TV into one browse, with a watchlist, offline downloads, subtitles you can tune once and keep, and watch parties you can invite people into. It runs on phones and tablets, and has a layout for Android TV.",
    category: "General",
  },
  {
    question: "Where can I download the Android app?",
    answer:
      `Every release is published as a signed APK on the StreamZ GitHub releases page, and the Download button on this site links straight to the newest one. The current release is v${site.release.version}. The file is named app-release.apk, so rename it only if you want to keep several versions side by side.`,
    category: "Download",
  },
  {
    question: "How do I install an APK on Android?",
    answer:
      "Tap the download button on your Android device, then open the finished file from the notification or your Downloads folder. Android will ask you to authorize installing apps from that source — some devices label it “Allow from this source”. Approve it once, install, then switch the permission back off if you no longer need it.",
    category: "Installation",
  },
  {
    question: "Is StreamZ available on Google Play?",
    answer:
      "No. StreamZ is distributed as an APK you install directly, so updates arrive through the in-app update check rather than the Play Store. Always take the file from the link on this site or the release page it points to, and ignore copies posted elsewhere.",
    category: "Download",
  },
  {
    question: "How do I check the APK is the file we published?",
    answer:
      `Each release lists a SHA-256 digest. For v${site.release.version} it is ${site.release.checksum}. On a desktop, run a checksum over the downloaded file and compare; a mismatch means the file did not come from us.`,
    category: "Download",
  },
  {
    question: "How does Live TV work in StreamZ?",
    answer:
      "Live TV opens as a channel wall with the schedule underneath. Channels are grouped into categories, so you can filter the wall down to the lanes you actually watch, star the ones to keep, and the recently watched list holds the last ones close. Every tile shows what is on now and what plays next, so you can leave a stream before it ends.",
    category: "Live TV",
  },
  {
    question: "Can I watch Live TV on a bigger screen?",
    answer:
      "Yes. Live TV has a channel drawer inside the player, so you can switch channels without leaving the stream, and the app carries a remote-driven layout for Android TV.",
    category: "Live TV",
  },
  {
    question: "Does StreamZ support offline downloads?",
    answer:
      "Yes. Pick a quality, start the download and the title stays available with no connection. A notifier tells you when a download is ready, and the downloads screen holds the queue and anything already saved.",
    category: "Features",
  },
  {
    question: "What are watch parties?",
    answer:
      "A watch party plays the same title in sync across everyone in the room, with a lobby link to invite people, in-player chat, and reactions that land on screen without pausing the film.",
    category: "Features",
  },
  {
    question: "How do subtitles and picture settings work?",
    answer:
      "Subtitle settings live in their own screen, so size and style are configured once and reused. Video quality and aspect controls are stored per device, which keeps a phone and a TV tuned differently when you want them to be.",
    category: "Features",
  },
  {
    question: "How do I get access to the app?",
    answer:
      "Sign in with Google on the device you want to use. Access runs on a subscription tied to your account, and Settings shows the activation key for that install. Write the key down before you uninstall — removing the app clears the saved copy.",
    category: "General",
  },
  {
    question: "How do updates reach the app?",
    answer:
      "The app checks for a newer build, shows the changelog before you agree to anything, and installs over the same signing key, so updating does not ask you to uninstall first or lose your downloads.",
    category: "General",
  },
  {
    question: "The APK download is not starting. What should I do?",
    answer:
      "Check your connection and free storage first, then make sure your browser is allowed to download files. Some browsers ask once per site to keep a file rather than preview it. If the download starts but installation is blocked, Android is asking you to approve installs from that source. Never take a replacement APK from an unverified mirror.",
    category: "Troubleshooting",
  },
  {
    question: "How can I contact support?",
    answer: `Email ${site.supportEmail} or message ${site.telegram.handle} on Telegram at ${site.telegram.url}. Tell us the app version and the device you are using, and please do not send personal or sensitive information.`,
    category: "General",
  },
];

export function searchFaq(query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return faqs.filter((faq) =>
    terms.every((term) =>
      `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase().includes(term),
    ),
  );
}
