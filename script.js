const scriptURL = 'https://script.google.com/macros/s/your-script-id/exec';
const wordForm = document.getElementById('wordForm');
const formMessage = document.getElementById('formMessage');

if (wordForm) {
  wordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const word = document.getElementById('word').value.trim();
    const translation = document.getElementById('translation').value.trim();
    const rootAnalysis = document.getElementById('rootAnalysis').value.trim();
    const example = document.getElementById('example').value.trim();
    const partOfSpeech = document.getElementById('partOfSpeech').value.trim();
    const submitButton = wordForm.querySelector('button[type="submit"]');

    if (!word || !translation) {
      formMessage.textContent = '請先填入英文單字與中文翻譯。';
      formMessage.style.color = '#b91c1c';
      return;
    }

    submitButton.disabled = true;
    formMessage.textContent = '儲存中，請稍候...';
    formMessage.style.color = '#6b7280';

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word,
          translation,
          rootAnalysis,
          example,
          partOfSpeech,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || '儲存失敗，請稍後再試。');
      }

      formMessage.textContent = '單字已成功儲存至 Google 試算表！';
      formMessage.style.color = '#047857';
      wordForm.reset();
    } catch (error) {
      formMessage.textContent = `錯誤：${error.message}`;
      formMessage.style.color = '#b91c1c';
    } finally {
      submitButton.disabled = false;
    }
  });
}
