"use client"
import { useEffect, useState } from "react"
import CryptoJS from "crypto-js"
import { Lock, Upload, Download, FileText, CheckCircle2, AlertCircle } from "lucide-react"

const API_BASE_URL = "https://jfpdtqrxhl.execute-api.eu-north-1.amazonaws.com/dev"
const SECRET_KEY = "abcd1234"

export default function Home() {
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)

  const fetchFiles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/list`)
      const data = await res.json()
      setFiles(data)
    } catch (err) {
      console.error("❌ Error fetching file list:", err)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Please select a file first" })
      return
    }

    setUploading(true)
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const encrypted = CryptoJS.AES.encrypt(reader.result, SECRET_KEY).toString()
        await fetch(`${API_BASE_URL}/files?fileName=${file.name}`, {
          method: "POST",
          body: encrypted,
        })
        setMessage({ type: "success", text: "File uploaded securely!" })
        setFile(null)
        fetchFiles()
      } catch (err) {
        setMessage({ type: "error", text: "Upload failed" })
      } finally {
        setUploading(false)
      }
    }
    reader.readAsText(file)
  }

  const handleDownload = async (fileName) => {
    try {
      const res = await fetch(`${API_BASE_URL}/files?fileName=${fileName}`)
      const data = await res.json()
      const encryptedData = data.body
      const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8)

      if (!decrypted) throw new Error("Decryption failed")

      const blob = new Blob([decrypted], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      a.click()
      URL.revokeObjectURL(url)
      setMessage({ type: "success", text: "File decrypted and downloaded!" })
    } catch (err) {
      console.error("Download error:", err)
      setMessage({ type: "error", text: "Failed to decrypt file" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SecureVault</h1>
            <p className="text-xs text-slate-400">End-to-end encrypted file transfer</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30"
                : "bg-red-500/10 border border-red-500/30"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={message.type === "success" ? "text-emerald-300" : "text-red-300"}>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">Upload & Encrypt</h2>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-4">
              <label className="block">
                <div className="mb-3 text-sm font-medium text-slate-300">Select File</div>
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0])
                    setMessage(null)
                  }}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </label>
              {file && (
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-start gap-3">
                  <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-cyan-300 truncate">{file.name}</p>
                    <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Encrypting...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload & Encrypt
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Files List Section */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-semibold text-white">Your Files</h2>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl p-8">
              {files.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">No files yet</p>
                  <p className="text-slate-500 text-xs mt-1">Upload a file to get started</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {files.map((name) => (
                    <div
                      key={name}
                      className="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600 rounded-lg transition group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-200 truncate">{name}</span>
                      </div>
                      <button
                        onClick={() => handleDownload(name)}
                        className="flex-shrink-0 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-medium rounded border border-emerald-500/30 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <div className="text-xs font-semibold text-cyan-400 mb-1 uppercase tracking-wider">Encryption</div>
            <p className="text-sm text-slate-300">AES-256 encryption</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <div className="text-xs font-semibold text-cyan-400 mb-1 uppercase tracking-wider">Storage</div>
            <p className="text-sm text-slate-300">AWS S3 backend</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <div className="text-xs font-semibold text-cyan-400 mb-1 uppercase tracking-wider">Privacy</div>
            <p className="text-sm text-slate-300">End-to-end secure</p>
          </div>
        </div>
      </main>
    </div>
  )
}
