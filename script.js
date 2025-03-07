  // Define model URLs
    const modelUrls = {
      diabetes: 'https://sebukpor.github.io/Diabetes-classification/',
      cancer: 'https://sebukpor.github.io/multi-cancer-classification/',
      tuberculosis: 'https://sebukpor.github.io/tuberculosis_classification/',
      pneumonia: 'https://sebukpor.github.io/pneumonia/',
      heart: 'https://sebukpor.github.io/heart-diseases-prediction/',
      breast: 'https://sebukpor.github.io/breast-cancer-classification/',
      malaria: 'https://sebukpor.github.io/malaria-classification/',
      dialarge: 'https://sebukpor.github.io/Diabetes-large-input/',
      dia18: 'https://sebukpor.github.io/diabetes-18/'
      // Add more model URLs if needed
    };

    // Function to load a model in the iframe and update the URL hash
    function loadModel(model) {
      const modelUrl = modelUrls[model];
      if (modelUrl) {
        // Update the URL hash
        window.location.hash = model;
        // Hide the cards container and show the iframe container
        document.getElementById('cardsContainer').style.display = 'none';
        document.getElementById('iframeContainer').style.display = 'block';
        document.getElementById('modelFrame').src = modelUrl;
      }
    }

    // Add click event listeners to all model cards
    document.querySelectorAll('.model-card').forEach(card => {
      card.addEventListener('click', function() {
        const model = this.dataset.model;
        loadModel(model);
      });
    });

    // Close button event listener to return to the model cards view
    document.getElementById('closeIframe').addEventListener('click', function() {
      // Hide the iframe container and show the cards container
      document.getElementById('iframeContainer').style.display = 'none';
      document.getElementById('cardsContainer').style.display = 'block';
      // Reset the URL hash
      history.pushState("", document.title, window.location.pathname + window.location.search);
    });

    // On page load, check if a hash exists and load the corresponding model
    window.addEventListener('load', function() {
      const hash = window.location.hash.substring(1);
      if (hash && modelUrls[hash]) {
        loadModel(hash);
      }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.model-card').forEach(card => {
                const title = card.querySelector('.model-title').textContent.toLowerCase();
                const description = card.querySelector('.model-description').textContent.toLowerCase();
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
