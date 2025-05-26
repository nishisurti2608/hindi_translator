import { HfInference } from '@huggingface/inference'

// initialize with your token from import.meta
const hf = new HfInference(import.meta.env.VITE_HF_TOKEN)

const inputEl  = document.getElementById('user-input')
const btnEl    = document.getElementById('translate')
const outputEl = document.getElementById('output')

btnEl.addEventListener('click', async () => {
  const textToTranslate = inputEl.value.trim()
  if (!textToTranslate) {
    outputEl.textContent = 'Please enter some text to translate.'
    return
  }

  outputEl.textContent = 'Translating…'

  try {
    const res = await hf.translation({
      model: 'facebook/mbart-large-50-many-to-many-mmt',
      inputs: textToTranslate,
      parameters: {
        src_lang: 'en_XX',
        tgt_lang: 'hi_IN'
      }
    })
    outputEl.textContent = res.translation_text
  } catch (err) {
    console.error(err)
    outputEl.textContent = 'Error during translation. See console for details.'
  }
})
