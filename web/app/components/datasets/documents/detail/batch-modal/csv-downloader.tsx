'use client'
import type { FC } from 'react'
import React from 'react'
import {
  useCSVDownloader,
} from 'react-papaparse'
import { useTranslation } from 'react-i18next'
import { useContext } from 'use-context-selector'
import { Download02 as DownloadIcon } from '@/app/components/base/icons/src/vender/solid/general'
import { ChunkingMode } from '@/models/datasets'
import I18n from '@/context/i18n'
import { LanguagesSupported } from '@/i18n-config/language'

const CSV_TEMPLATE_QA_EN = [
  ['question', 'answer'],
  ['question1', 'answer1'],
  ['question2', 'answer2'],
]
const CSV_TEMPLATE_QA_CN = [
  ['问题', '答案'],
  ['问题 1', '答案 1'],
  ['问题 2', '答案 2'],
]
const CSV_TEMPLATE_EN = [
  ['segment content'],
  ['content1'],
  ['content2'],
]
const CSV_TEMPLATE_CN = [
  ['分段内容'],
  ['内容 1'],
  ['内容 2'],
]

const CSVDownload: FC<{ docForm: ChunkingMode }> = ({ docForm }) => {
  const { t } = useTranslation()
  const { locale } = useContext(I18n)
  const { CSVDownloader, Type } = useCSVDownloader()

  const getTemplate = () => {
    if (locale === LanguagesSupported[1]) {
      if (docForm === ChunkingMode.qa)
        return CSV_TEMPLATE_QA_CN
      return CSV_TEMPLATE_CN
    }
    if (docForm === ChunkingMode.qa)
      return CSV_TEMPLATE_QA_EN
    return CSV_TEMPLATE_EN
  }

  return (
    <div className='mt-6'>
      <div className='text-sm font-medium text-text-primary'>{t('share.generation.csvStructureTitle')}</div>
      <div className='mt-2 max-h-[500px] overflow-auto'>
        {docForm === ChunkingMode.qa && (
          <table className='w-full table-fixed border-separate border-spacing-0 rounded-lg border border-divider-subtle text-xs'>
            <thead className='text-text-secondary'>
              <tr>
                <td className='h-9 border-b border-divider-subtle pl-3 pr-2'>{t('datasetDocuments.list.batchModal.question')}</td>
                <td className='h-9 border-b border-divider-subtle pl-3 pr-2'>{t('datasetDocuments.list.batchModal.answer')}</td>
              </tr>
            </thead>
            <tbody className='text-text-tertiary'>
              <tr>
                <td className='h-9 border-b border-divider-subtle pl-3 pr-2 text-[13px]'>{t('datasetDocuments.list.batchModal.question')} 1</td>
                <td className='h-9 border-b border-divider-subtle pl-3 pr-2 text-[13px]'>{t('datasetDocuments.list.batchModal.answer')} 1</td>
              </tr>
              <tr>
                <td className='h-9 pl-3 pr-2 text-[13px]'>{t('datasetDocuments.list.batchModal.question')} 2</td>
                <td className='h-9 pl-3 pr-2 text-[13px]'>{t('datasetDocuments.list.batchModal.answer')} 2</td>
              </tr>
            </tbody>
          </table>
        )}
        {docForm === ChunkingMode.text && (
          <table className='w-full table-fixed border-separate border-spacing-0 rounded-lg border border-divider-subtle text-xs'>
            <thead className='text-text-secondary'>
              <tr>
                <td className='h-9 border-b border-divider-subtle pl-3 pr-2'>{t('datasetDocuments.list.batchModal.contentTitle')}</td>
              </tr>
            </thead>
            <tbody className='text-text-tertiary'>
              <tr>
                <td className='h-9 border-b border-divider-subtle pl-3 pr-2 text-[13px]'>{t('datasetDocuments.list.batchModal.content')} 1</td>
              </tr>
              <tr>
                <td className='h-9 pl-3 pr-2 text-[13px]'>{t('datasetDocuments.list.batchModal.content')} 2</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <CSVDownloader
        className="mt-2 block cursor-pointer"
        type={Type.Link}
        filename={'template'}
        bom={true}
        data={getTemplate()}
      >
        <div className='flex h-[18px] items-center space-x-1 text-xs font-medium text-text-accent'>
          <DownloadIcon className='mr-1 h-3 w-3' />
          {t('datasetDocuments.list.batchModal.template')}
        </div>
      </CSVDownloader>
    </div>

  )
}
export default React.memo(CSVDownload)
