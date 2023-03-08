import { React, useState } from 'react'
import CustomInput from './CustomInput'
import {InboxOutlined} from "@ant-design/icons"
import ReactQuill from 'react-quill';
import { Upload } from 'antd';
import "react-quill/dist/quill.snow.css";
const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const AddProduct = () => {
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e);
        console.log(e);

    }
    return (
        <div>
            <h3 className="mb-4title">AddProduct
            </h3>
            <div>
                <form>
                    <CustomInput type='text' label='Enter Product title' />
                    <div className='mb-3'>
                        <ReactQuill theme="snow" value={desc} onChange={(evt) => {
                            handleDesc(evt);
                        }} />
                    </div>
                    <CustomInput type='text' label='Enter Product title' />
                    <select className="form-control py-3 mb-3" name="" id="">
                        <option value="">
                            Select Category
                        </option>
                    </select>
                    <select className="form-control py-3 mb-3" name="" id="">
                        <option value="">
                            Select Color
                        </option>
                    </select>
                    <select className="form-control py-3 mb-3" name="" id="">
                        <option value="">
                            Select Brand
                        </option>
                    </select>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                    <button type="submit" className='btn btn-success border-0 rounded-3 my-5'>
                        Add Brand
                    </button>
                </form>
            </div>
        </div>
    )
};


export default AddProduct