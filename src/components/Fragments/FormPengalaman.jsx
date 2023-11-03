import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '../Elements/Modal/fileUpload';
import { InputForm, SelectForm, TextAreaForm } from '../Elements/Input';
import Button from '../Elements/Button';
import Spinner from '../Elements/Spinner';

const FormPengalaman = () => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [pglId, setPglId] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    pgl_kegiatan: '',
    pgl_pembtgs: '',
    pgl_nokontrak: '',
    pgl_nilai: '',
    pgl_almtpembtgs: '',
    pgl_lokasi: '',
    pgl_telppembtgs: '',
    pgl_tglkontrak: '',
    pgl_tglprogress: '',
    pgl_slskontrak: '',
    pgl_id_attachment: '',
    pgl_persenprogress: 0,
  };

  const validation = Yup.object({
    pgl_kegiatan: Yup.string().required('Nama Kegiatan harus diisi'),
    pgl_pembtgs: Yup.string().required('Instansi Pemberi Tugas harus diisi'),
    pgl_nokontrak: Yup.string().required('No Kontrak harus diisi'),
    pgl_nilai: Yup.string().required('Nilai Kontrak harus diisi'),
    pgl_almtpembtgs: Yup.string().required('Alamat Instansi harus diisi'),
    pgl_lokasi: Yup.string().required('Lokasi Pekerjaan harus diisi'),
    pgl_telppembtgs: Yup.string().required('Telepon Instansi harus diisi'),
    pgl_tglkontrak: Yup.date().required('Tanggal Kontrak harus diisi'),
    pgl_tglprogress: Yup.date().required('Tanggal Progress harus diisi'),
    pgl_slskontrak: Yup.date().required('Tanggal Selesai Kontrak harus diisi'),
    pgl_id_attachment: Yup.string().required('belum ada file yang ter-upload'),
    pgl_persenprogress: Yup.number()
      .required('Progress harus diisi')
      .min(20, 'Progress setidaknya harus 20%')
      .max(100, 'Progress tidak bisa diatas 100%'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleRangeChange = (e) => {
    const progressValue = e.target.value;
    formik.setFieldValue('pgl_persenprogress', progressValue);
  };

  const handleCloseModal = (pglIdAttachment) => {
    setShowModal(false);
    setPglId(pglIdAttachment);
    formik.setFieldValue('pgl_id_attachment', pglIdAttachment);
  };

  const handleBack = () => {
    history.back();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          label="Nama Pekerjaan"
          type="text"
          {...formik.getFieldProps('pgl_kegiatan')}
          error={formik.touched.pgl_kegiatan && formik.errors.pgl_kegiatan}
        />
        <InputForm
          label="Instansi Pemberi Tugas"
          type="text"
          {...formik.getFieldProps('pgl_pembtgs')}
          error={formik.touched.pgl_pembtgs && formik.errors.pgl_pembtgs}
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputForm
            label="No Kontrak"
            type="text"
            {...formik.getFieldProps('pgl_nokontrak')}
            error={formik.touched.pgl_nokontrak && formik.errors.pgl_nokontrak}
          />
          <InputForm
            label="Nilai Kontrak"
            type="text"
            {...formik.getFieldProps('pgl_nilai')}
            error={formik.touched.pgl_nilai && formik.errors.pgl_nilai}
          />
        </div>
        <TextAreaForm
          label="Alamat Instansi"
          {...formik.getFieldProps('pgl_almtpembtgs')}
          error={
            formik.touched.pgl_almtpembtgs && formik.errors.pgl_almtpembtgs
          }
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputForm
            label="Lokasi Pekerjaan"
            type="text"
            {...formik.getFieldProps('pgl_lokasi')}
            error={formik.touched.pgl_lokasi && formik.errors.pgl_lokasi}
          />
          <InputForm
            label="Telepon Instansi"
            type="text"
            {...formik.getFieldProps('pgl_telppembtgs')}
            error={
              formik.touched.pgl_telppembtgs && formik.errors.pgl_telppembtgs
            }
          />
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <InputForm
            label="Tanggal Kontrak"
            type="date"
            {...formik.getFieldProps('pgl_tglkontrak')}
            error={
              formik.touched.pgl_tglkontrak && formik.errors.pgl_tglkontrak
            }
          />
          <InputForm
            label="Tanggal Progress"
            type="date"
            {...formik.getFieldProps('pgl_tglprogress')}
            error={
              formik.touched.pgl_tglprogress && formik.errors.pgl_tglprogress
            }
          />
          <InputForm
            label="Tanggal Selesai Kontrak"
            type="date"
            {...formik.getFieldProps('pgl_slskontrak')}
            error={
              formik.touched.pgl_slskontrak && formik.errors.pgl_slskontrak
            }
          />
        </div>
        <div className="mt-3 mb-6">
          <label className="mb-4 text-sm font-semibold capitalize">
            Progress: {formik.values.pgl_persenprogress} %
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            {...formik.getFieldProps('pgl_persenprogress')}
            onChange={handleRangeChange}
            className="w-full mt-2"
          />
          {formik.touched.pgl_persenprogress &&
            formik.errors.pgl_persenprogress && (
              <p className="mt-2 text-sm text-red-500 ">
                {formik.errors.pgl_persenprogress}
              </p>
            )}
        </div>
        <div className="my-10">
          <button
            type="button"
            onClick={handleOpenModal}
            className="w-full py-2 font-bold text-white duration-200 ease-in rounded-lg bg-violet-400 hover:bg-violet-500"
          >
            Upload File
          </button>
          {formik.touched.pgl_id_attachment &&
            formik.errors.pgl_id_attachment && (
              <p className="mt-2 text-sm text-center text-red-500 ">
                {formik.errors.pgl_id_attachment}
              </p>
            )}
        </div>

        <div className="flex gap-4 mt-20">
          <Button
            cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
              formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <Spinner /> : 'submit'}
          </Button>
          <Button
            cN={`btn bg-slate-300 text-black hover:bg-slate-400 ease-in duration-200 ${
              formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={formik.isSubmitting}
            type="button"
            onClick={() => handleBack()}
          >
            Kembali
          </Button>
        </div>
      </form>
      {showModal && <FileUpload close={handleCloseModal} Id={pglId} />}
    </>
  );
};

export default FormPengalaman;
