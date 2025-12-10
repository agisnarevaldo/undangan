"use client";

interface WelcomeOverlayProps {
  guestName: string | null;
  onOpenInvitation: () => void;
}

export default function WelcomeOverlay({
  guestName,
  onOpenInvitation,
}: WelcomeOverlayProps) {
  return (
    <div
      className="fixed inset-0 bg-white dark:bg-black overflow-y-auto z-50 flex items-center justify-center p-4"
      id="welcome"
    >
      <div className="absolute inset-0 opacity-25 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/cinematic.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative z-10">
        <div className="flex flex-col text-center">
          <h2 className="font-esthetic mb-4 text-[2.25rem]">The Wedding Of</h2>
          <img
            src="/images/updated/welcome.png"
            alt="background"
            className="rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-md mb-4 mx-auto"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h2 className="font-esthetic mb-4 text-[2.25rem]">
            Tryanda &amp; Putri
          </h2>
          <small className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
            Kepada Yth Bapak/Ibu/Saudara/i
          </small>
          {guestName && (
            <div className="my-2">
              <p className="text-xl">{guestName}</p>
            </div>
          )}
          <button
            type="button"
            className="bg-white dark:bg-gray-100 text-gray-900 shadow-md rounded-full mt-3 mx-auto px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
            onClick={onOpenInvitation}
          >
            <i className="fa-solid fa-envelope-open mr-2 animate-bounce"></i>
            Open Invitation
          </button>
        </div>
      </div>
    </div>
  );
}
