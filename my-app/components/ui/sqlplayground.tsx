//Perfect code/////////////////////////////////////////////////////////////////////



// import { useEffect, useState } from 'react'

// export default function SQLPlayground() {
//   const [query, setQuery] = useState('')
//   const [result, setResult] = useState('')
//   const [output, setOutput] = useState('')
//   const [schema, setSchema] = useState('')

//   // ⬇️ Load schema from public folder once on mount
//   useEffect(() => {
//     fetch('/schema_summary.txt')
//       .then((res) => res.text())
//       .then((text) => setSchema(text))
//       .catch((err) => console.error('Failed to load schema:', err))
//   }, [])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setOutput('')
//     setResult('Generating...')

//     try {
//       const response = await fetch('http://localhost:11434/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           model: 'llama3.2',
//           messages: [
//             {
//               role: "system",
//               content: `
// You are a SQL query generator for PostgreSQL.

// Use ONLY the following schema:
// ${schema}

// ONLY return raw SQL. DO NOT explain, comment, or include alternatives.
// DO NOT return markdown or anything other than the SQL query.

// This is for an internal admin.`
//             },
//             {
//               role: "user",
//               content: query,
//             }
//           ],
//           stream: false
//         })
//       })

//       const data = await response.json()
//       const generatedQuery = data.message.content.replace(/```sql|```/g, '').trim()

//       // Validate basic SQL syntax
//       if (
//         generatedQuery === 'INVALID_SQL' ||
//         !/^\s*(SELECT|INSERT|UPDATE|DELETE)\s+/i.test(generatedQuery)
//       ) {
//         setResult('❌ Invalid SQL generated')
//         setOutput('The model did not return valid SQL. Try rephrasing.')
//         return
//       }

//       setResult(generatedQuery)

//       const sqlResponse = await fetch('/api/sql', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: generatedQuery }),
//       })

//       const text = await sqlResponse.text()

//       try {
//         const sqlData = JSON.parse(text)
//         setOutput(JSON.stringify(sqlData, null, 2))
//       } catch (err) {
//         console.error('Failed to parse SQL response:', text)
//         setOutput(`❌ Server Error:\n\n${text}`)
//       }
//     } catch (error) {
//       console.error('Error:', error)
//       setResult('❌ Error generating or executing SQL')
//       setOutput(String(error))
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">🧪 SQL Playground</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="block text-sm font-medium text-gray-700">Enter your prompt:</label>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="e.g., show me all users with email addresses"
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Generate and Run SQL
//         </button>
//       </form>

//       {result && (
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold mb-2">🤖 Generated SQL:</h2>
//           <pre className="bg-gray-800 text-green-200 p-3 rounded whitespace-pre-wrap font-mono">
//             {result}
//           </pre>
//         </div>
//       )}

//       {output && (
//         <div className="mt-4">
//           <h2 className="text-lg font-semibold mb-2">📊 Query Output:</h2>
//           <pre className="bg-gray-100 text-gray-800 p-3 rounded whitespace-pre-wrap font-mono">
//             {output}
//           </pre>
//         </div>
//       )}
//     </div>
//   )
// }
// Note: Make sure to replace the API endpoint URL with your actual backend URL if not running locally.
// Also, ensure your backend is set up to handle the SQL execution as shown in the initial code snippet.



//keep safe/////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////UI implementation of the above code//////////////////////////////////////
'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: string
  top: string
  delay: string
  duration: string
}

export default function SQLPlayground() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [output, setOutput] = useState('')
  const [schema, setSchema] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    fetch('/schema_summary.txt')
      .then((res) => res.text())
      .then((text) => setSchema(text))
      .catch((err) => console.error('Failed to load schema:', err))

    // Client-side only particle generation
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
    }))
    setParticles(newParticles)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOutput('')
    setResult('Generating...')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2',
 messages: [
            {
              role: "system",
              content: `
// You are a SQL query generator for PostgreSQL.

Use ONLY the following schema:
${schema}

ONLY return raw SQL. DO NOT explain, comment, or include alternatives.
DO NOT return markdown or anything other than the SQL query.

This is for an internal admin.`
            },
            {
              role: "user",
              content: query,
            }
          ]
,
          stream: false,
        }),
      })

      const data = await response.json()
      const generatedQuery = data.message.content.replace(/```sql|```/g, '').trim()

      if (!/^\s*(SELECT|INSERT|UPDATE|DELETE)\s+/i.test(generatedQuery)) {
        setResult('❌ Invalid SQL generated')
        setOutput('The model did not return valid SQL. Try rephrasing.')
        setIsLoading(false)
        return
      }

      setResult(generatedQuery)

      const sqlResponse = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: generatedQuery }),
      })

      const text = await sqlResponse.text()

      try {
        const sqlData = JSON.parse(text)
        setOutput(JSON.stringify(sqlData, null, 2))
      } catch {
        setOutput(`❌ Server Error:\n\n${text}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setResult('❌ Error generating or executing SQL')
      setOutput(String(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden text-white">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30 z-0">
        <div className="aurora-1 absolute w-full h-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse"></div>
        <div className="aurora-2 absolute w-full h-full bg-gradient-to-l from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles (client-only) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20 animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Foreground UI */}
      <div className="relative z-10 max-w-5xl mx-auto p-6 space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            👩‍💼 OLLY-AI
          </h1>
          <p className="text-purple-300 text-lg">AI-Powered PostgreSQL Assistant • Oil India Limited</p>
          <div className="flex justify-center items-center gap-2 text-sm text-gray-300 mt-2">
            <div className={`w-3 h-3 rounded-full ${schema ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            {schema ? 'Database Schema Loaded' : 'Loading Schema...'}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-md font-medium text-purple-300">
            💬 How can I help you today?:
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={4}
            className="w-full bg-black/50 border border-purple-400/40 text-white p-4 rounded-lg placeholder:text-gray-500 font-mono"
            placeholder="e.g., Get all employees from department X"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-bold text-lg rounded-lg transition ${
              isLoading
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white hover:scale-105 hover:shadow-lg'
            }`}
          >
            {isLoading ? 'OLLY is thinking...' : '🚀 Generate SQL Query'}
          </button>
        </form>

        {/* SQL Output */}
        {result && (
          <div className="bg-black/60 border border-green-400/30 rounded-xl p-4">
            <h2 className="text-green-300 text-xl font-semibold mb-2">🤖 Generated SQL:</h2>
            <pre className="text-green-200 font-mono whitespace-pre-wrap">{result}</pre>
          </div>
        )}

        {/* Query Output */}
        {output && (
          <div className="bg-black/60 border border-cyan-400/30 rounded-xl p-4">
            <h2 className="text-cyan-300 text-xl font-semibold mb-2">📊 Database Result:</h2>
            <pre className="text-cyan-100 font-mono whitespace-pre-wrap overflow-x-auto max-h-96">{output}</pre>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .aurora-1 {
          animation: aurora1 8s ease-in-out infinite alternate;
        }
        .aurora-2 {
          animation: aurora2 10s ease-in-out infinite alternate;
        }
        @keyframes aurora1 {
          0% { transform: translateX(-100px); opacity: 0.3; }
          50% { transform: translateX(100px); opacity: 0.6; }
          100% { transform: translateX(200px); opacity: 0.3; }
        }
        @keyframes aurora2 {
          0% { transform: translateX(200px); opacity: 0.2; }
          50% { transform: translateX(-50px); opacity: 0.5; }
          100% { transform: translateX(-200px); opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}
