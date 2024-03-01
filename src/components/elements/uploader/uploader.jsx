import React from 'react'
import { Loader, Uploader as UploaderRS } from 'rsuite'
import { previewFile} from 'rsuite/esm/utils'
import { FaCamera } from 'react-icons/fa'
import PropTypes from 'prop-types'
//import { resizeImageFile } from 'react-image-file-resizer'
export const Uploader = ({ onSelectFile, setError, verificationPhoto }) => {
  // const toaster = useToaster()
  const [uploading, setUploading] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState('')

  const handleUpload = (file) => {
    try {
      setUploading(true)

      onSelectFile(file)
      previewFile(file, (value) => {
        setSelectedFile(value) 
        setUploading(false)
      })
      setError(null)
    } catch (error) {
      setError('Error al cargar la foto')
      setUploading(false)
    }
  }

  return (
    <UploaderRS
      fileListVisible={false}
      action='./uploader.jsx'
      style={{display: 'flex', justifyContent: 'center'}}
      accept='image/png, image/jpeg, image/jpg'
      onUpload={(f) => {
        handleUpload(f.blobFile)
      }}
    >
      <button 
        type='button' 
        style={{ 
          width: verificationPhoto ? '150px' : '120px', 
          height: verificationPhoto ? '200px' : '150px', 
          margin: '0' 
        }}>
        {uploading && <Loader backdrop center />}
        {selectedFile ? (
          <img
            src={selectedFile}
            width='100%'
            height='100%'
            style={{ objectFit: 'cover', borderRadius: '20px' }}
            alt='Preview'
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width={verificationPhoto ? '150px' : '120px'} height={verificationPhoto ? '200px' : '150px'} viewBox="0 0 162 200" fill="none">
            <path d="M93.15 70C89.9276 70 86.8372 68.4196 84.5586 65.6066C82.2801 62.7935 81 58.9782 81 55C81 51.0217 82.2801 47.2064 84.5586 44.3934C86.8372 41.5803 89.9276 40 93.15 40C96.3724 40 99.4628 41.5803 101.741 44.3934C104.02 47.2064 105.3 51.0217 105.3 55C105.3 58.9782 104.02 62.7935 101.741 65.6066C99.4628 68.4196 96.3724 70 93.15 70Z" fill="#D40078" fill-opacity="0.49"/>
            <path d="M137.7 0H24.3C17.8611 0.0237409 11.6915 3.19207 7.13854 8.81303C2.58557 14.434 0.0192301 22.0508 0 30V118.6L31.4279 79.8C36.0587 74.3586 42.2069 71.3238 48.5999 71.3238C54.9929 71.3238 61.1411 74.3586 65.7719 79.8L89.027 108.67L96.2197 99.79C100.785 94.1854 106.962 91.0394 113.4 91.0394C119.838 91.0394 126.015 94.1854 130.58 99.79L162 138.6V30C161.981 22.0508 159.414 14.434 154.861 8.81303C150.308 3.19207 144.139 0.0237409 137.7 0ZM93.1498 70C89.9275 70 86.8371 68.4197 84.5585 65.6066C82.28 62.7936 80.9999 58.9783 80.9999 55C80.9999 51.0218 82.28 47.2065 84.5585 44.3934C86.8371 41.5804 89.9275 40 93.1498 40C96.3722 40 99.4626 41.5804 101.741 44.3934C104.02 47.2065 105.3 51.0218 105.3 55C105.3 58.9783 104.02 62.7936 101.741 65.6066C99.4626 68.4197 96.3722 70 93.1498 70Z" fill="#D40078" fill-opacity="0.08"/>
            <path d="M65.7719 79.8C61.1411 74.3586 54.9929 71.3238 48.5999 71.3238C42.2069 71.3238 36.0587 74.3586 31.4279 79.8L0 118.6V170C0.0192301 177.949 2.58557 185.566 7.13854 191.187C11.6915 196.808 17.8611 199.976 24.3 200H137.7C144.301 200 150.619 196.67 155.196 190.8L65.7719 79.8Z" fill="#D40078"/>
            <path d="M162 138.58L130.58 99.79C126.015 94.1854 119.838 91.0394 113.4 91.0394C106.962 91.0394 100.785 94.1854 96.2201 99.79L89.0273 108.67L155.164 190.76C159.554 185.21 162.008 177.76 162 170V138.58Z" fill="#D40078" fill-opacity="0.49"/>
          </svg>
        )}
      </button>
    </UploaderRS>
  )
}

Uploader.propTypes = {
  selectedFile: PropTypes.string,
  onSelectFile: PropTypes.func,
  setError: PropTypes.func
}
