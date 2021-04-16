import React from 'react'
import {
  Button
} from '@material-ui/core'
import './formfields.css'
import { useTranslation } from 'react-i18next'

const MultiStepButtons = (props) => {

  const {currentStep , setCurrentStep, isSubmitting, steps , setSaved  } = props
  const {t} = useTranslation()

  return (
    <div className="step_buttons">
      {currentStep > 0  &&
        <Button
          onClick={()=> {setCurrentStep( currentStep - 1)}}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        > {t('previous')}
        </Button>
      }
      <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
        > {currentStep ===  steps.length -1 ? t('finish') : t('next')}
      </Button>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={() => {
          setSaved(true)
        }}
        disabled={isSubmitting}
      >{t('save_draft')}
      </Button>
    </div>
  )

}

export default MultiStepButtons
