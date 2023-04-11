import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const CreateArtical = () => {
  const [markdownContent, setMarkdownContent] = useState('')
  const handleContentChange = (event) => {
    setMarkdownContent(event.target.value)
  }

  console.log(markdownContent)
  const handleSubmit = (event) => {
    event.preventDefault()
    // Gửi giá trị markdownContent lên server thông qua một POST request
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '50%' }}>
        <form onSubmit={handleSubmit}>
          <textarea id='markdown-editor' onChange={handleContentChange} value={markdownContent} />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div style={{ width: '50%' }}>
        <div>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default CreateArtical
