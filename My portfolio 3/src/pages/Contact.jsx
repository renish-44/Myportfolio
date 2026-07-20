import { useState } from 'react'

function Contact() {
  const [message, setMessage] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  return (
    <main className="page-container">
      <h2>Contact</h2>
      <p>Send a message and I’ll reply as soon as possible.</p>

      <div className="contact-form">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write your message here..."
          rows="5"
        />

        <div className="form-footer">
          <button type="button" onClick={() => setShowHelp((current) => !current)}>
            {showHelp ? 'Hide help' : 'Show help'}
          </button>
          <span>{message.length} characters</span>
        </div>

        {showHelp && (
          <div className="help-box">
            <p>Use this form to share a brief message about your project or question.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Contact
