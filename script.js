const main = () => {
  const urls = {
    staging: "https://staging-lumen-api.herokuapp.com/v1",
    production: "https://api-lumen-app.herokuapp.com/v1",
  };

  const formElement = document.querySelector("#event-form");
  const customerIdInput = document.querySelector("#customer-id-input");
  const eventNameInput = document.querySelector("#event-name-input");
  const apiKeyInput = document.querySelector("#api-key-input");
  const resultBox = document.querySelector("#result-box");

  const productionEnvironmentInput = document.querySelector(
    "#production-environment-input"
  );

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const identifier = customerIdInput.value;
    const eventName = eventNameInput.value;
    const apiKey = apiKeyInput.value;

    const isProduction = productionEnvironmentInput.checked;

    const baseUrl = isProduction ? urls.production : urls.staging;
    const path = `${baseUrl}/event/track`;

    trackEvent(path, apiKey, {
      event_name: eventName,
      identifier,
    });
  });

  const trackEvent = async (url, apiKey, payload) => {
    resultBox.innerText = "";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          api_key: apiKey,
        },
      });

      const json = await response.json();
      const responseData = json?.data;

      console.log({ responseData });
      resultBox.innerText = "🟩 Success";
    } catch (e) {
      resultBox.innerText = `🟥 ${e}`;
    }
  };
};

main();
