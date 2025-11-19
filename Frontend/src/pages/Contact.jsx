import React from "react";

const Contact = () => {
  return (
    <section className="w-full flex justify-center items-center py-16 px-4 bg-[#0d0d0d]">
      <div className="w-full max-w-xl backdrop-blur-2xl bg-white/5 border border-yellow-500/20 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6 tracking-wide">
          Contact AureaBid Support
        </h2>

        <p className="text-gray-300 text-center mb-8">
          Have an issue with bidding, payments, or auction listings?
          <br />
          Send us a message — we usually reply within **24 hours**.
        </p>

        <form
          action="https://getform.io/f/bjjrnqlb"
          method="POST"
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            className="bg-black/40 border border-yellow-500/20 text-white p-3 rounded-xl outline-none focus:border-yellow-500 transition"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            className="bg-black/40 border border-yellow-500/20 text-white p-3 rounded-xl outline-none focus:border-yellow-500 transition"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Describe your issue or query..."
            rows="4"
            className="bg-black/40 border border-yellow-500/20 text-white p-3 rounded-xl outline-none focus:border-yellow-500 transition"
          ></textarea>

          {/* Hidden Honeypot */}
          <input type="hidden" name="_gotcha" />

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-xl transition shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
