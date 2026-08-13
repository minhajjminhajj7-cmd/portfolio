function Contact() {
  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-8 py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left side */}
        <div>
          <p className="text-gray-500 uppercase tracking-widest text-sm">
            Get In Touch
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Let's work together
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mt-6 max-w-lg">
            Have a project, idea, or opportunity you'd like to
            discuss? Feel free to send me a message.
          </p>

          <div className="mt-10 space-y-6">

            <div>
              <p className="text-gray-500 text-sm">
                Email
              </p>

              <p className="text-lg mt-1">
                YOUR-EMAIL-HERE
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Location
              </p>

              <p className="text-lg mt-1">
                Tanzania
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                GitHub
              </p>

              <p className="text-lg mt-1">
                github.com/yourusername
              </p>
            </div>

          </div>
        </div>


        {/* Right side */}
        <div>

          <form className="space-y-6">

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Your Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 outline-none focus:border-gray-500"
              />
            </div>


            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 outline-none focus:border-gray-500"
              />
            </div>


            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Subject
              </label>

              <input
                type="text"
                placeholder="What is this about?"
                className="w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 outline-none focus:border-gray-500"
              />
            </div>


            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Message
              </label>

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 outline-none focus:border-gray-500 resize-none"
              />
            </div>


            <button
              type="submit"
              className="w-full rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  )
}

export default Contact