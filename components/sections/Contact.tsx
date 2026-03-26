"use client";

export function Contact() {
  return (
    <section className="px-8 max-w-screen-2xl mx-auto py-48" id="contact">
      <div className="max-w-4xl mx-auto glass-card p-12 md:p-24 relative overflow-hidden border border-white/10">
        <div className="relative z-10 text-center mb-16">
          <h2 className="font-headline text-6xl font-extrabold tracking-tighter mb-4">
            LET'S START A CONVERSATION.
          </h2>
          <p className="text-white/30 font-label text-[10px] tracking-[0.3em] uppercase">
            Currently accepting new projects for Q3 2024
          </p>
        </div>
        <form className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="relative">
              <input
                className="peer block w-full appearance-none border-0 border-b border-white/10 bg-transparent py-4 px-0 text-white focus:border-white focus:outline-none focus:ring-0 transition-colors"
                id="name"
                name="name"
                placeholder=" "
                type="text"
              />
              <label
                className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-xs font-bold tracking-widest text-white/30 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-white"
                htmlFor="name"
              >
                FULL NAME
              </label>
            </div>
            <div className="relative">
              <input
                className="peer block w-full appearance-none border-0 border-b border-white/10 bg-transparent py-4 px-0 text-white focus:border-white focus:outline-none focus:ring-0 transition-colors"
                id="email"
                name="email"
                placeholder=" "
                type="email"
              />
              <label
                className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-xs font-bold tracking-widest text-white/30 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-white"
                htmlFor="email"
              >
                EMAIL ADDRESS
              </label>
            </div>
          </div>
          <div className="relative">
            <textarea
              className="peer block w-full appearance-none border-0 border-b border-white/10 bg-transparent py-4 px-0 text-white focus:border-white focus:outline-none focus:ring-0 transition-colors"
              id="message"
              name="message"
              placeholder=" "
              rows={3}
            ></textarea>
            <label
              className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-xs font-bold tracking-widest text-white/30 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-white"
              htmlFor="message"
            >
              PROJECT OVERVIEW
            </label>
          </div>
          <div className="flex justify-center pt-8">
            <button
              className="bg-white text-black px-16 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white/90 active:scale-95 transition-all w-full md:w-auto"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
