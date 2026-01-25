import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaTrash, FaCheck, FaUtensils, FaSpinner } from 'react-icons/fa';

const ImageUpload = () => {
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setUploadStatus("idle");
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1
    });

    const removeFile = () => {
        setFiles([]);
        setUploadStatus("idle");
    };

    const handleUpload = () => {
        setIsUploading(true);
        setUploadStatus("uploading");

        // Simulate API Upload
        setTimeout(() => {
            setIsUploading(false);
            setUploadStatus("success");
            // Here you would typically send the data to your backend
        }, 2000);
    };

    return (
        <section className="py-20 bg-white font-sans border-t border-gray-100">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
                            <FaUtensils /> Community Gallery
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Share Your <span className="text-orange-600">Food Stories</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Did your ChefKart cook make something amazing? Upload a photo and get featured on our homepage!
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-xl mx-auto">
                    {/* Dropzone Area */}
                    <motion.div
                        {...getRootProps()}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`border-3 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${isDragActive
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-400 hover:bg-orange-50/30'
                            }`}
                    >
                        <input {...getInputProps()} />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${isDragActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-500'
                                }`}>
                                <FaCloudUploadAlt className="text-4xl" />
                            </div>

                            {isDragActive ? (
                                <p className="text-xl font-bold text-orange-600">Drop the yummy photo here!</p>
                            ) : (
                                <div>
                                    <p className="text-lg text-gray-700 font-medium">
                                        Drag & drop your dish here, or <span className="text-orange-600 font-bold underline decoration-orange-300 decoration-2 underline-offset-2">browse</span>
                                    </p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Supports JPG, PNG (Max 5MB)
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Preview Section */}
                    <AnimatePresence mode="wait">
                        {files.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-6"
                            >
                                <div className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl p-4 flex items-center justify-between border border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img
                                                src={files[0].preview}
                                                alt="Preview"
                                                className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                                                onLoad={() => { URL.revokeObjectURL(files[0].preview) }}
                                            />
                                            <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full border-2 border-white text-xs">
                                                <FaCheck />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 truncate max-w-[150px] md:max-w-[200px]">
                                                {files[0].name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {(files[0].size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>

                                    {!isUploading && uploadStatus !== "success" && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            title="Remove file"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>

                                {/* Upload Button */}
                                <motion.button
                                    onClick={handleUpload}
                                    disabled={isUploading || uploadStatus === "success"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full mt-4 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all ${uploadStatus === "success"
                                            ? "bg-green-500 text-white cursor-default"
                                            : "bg-orange-600 text-white hover:bg-orange-700 hover:shadow-orange-500/30"
                                        }`}
                                >
                                    {isUploading ? (
                                        <>
                                            <FaSpinner className="animate-spin" /> Uploading...
                                        </>
                                    ) : uploadStatus === "success" ? (
                                        <>
                                            <FaCheck /> Upload Complete!
                                        </>
                                    ) : (
                                        "Upload Photo"
                                    )}
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ImageUpload;