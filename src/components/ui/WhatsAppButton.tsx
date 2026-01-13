"use client"

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5491153842610"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6
        w-14 h-14
        bg-green-500 hover:bg-green-600
        rounded-full
        flex items-center justify-center
        shadow-lg
        transition-transform hover:scale-105
      "
      aria-label="WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="26"
        height="26"
      >
        <path d="M12.04 2C6.58 2 2.13 6.44 2.13 11.9c0 2.11.55 4.17 1.6 5.99L2 22l4.27-1.12a9.86 9.86 0 0 0 5.77 1.85h.01c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm5.74 14.43c-.24.67-1.41 1.3-1.95 1.37-.5.07-1.12.1-1.81-.12-.42-.13-.96-.31-1.65-.61-2.91-1.26-4.8-4.22-4.95-4.41-.15-.2-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.3.6-.37.8-.37h.58c.18 0 .42-.07.66.5.24.58.81 2 .88 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.3.32-.13.62.17.3.77 1.27 1.65 2.05 1.13.99 2.09 1.3 2.39 1.45.3.15.48.13.66-.08.18-.2.76-.88.96-1.18.2-.3.4-.25.66-.15.27.1 1.71.81 2 1 .3.18.5.27.58.42.08.15.08.85-.16 1.52Z"/>
      </svg>
    </a>
  )
}
