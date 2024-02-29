// Chrome does not support the browser namespace.
if (typeof browser == 'undefined') {
  globalThis.browser = chrome;
}

// Setting BASE_URL which is used to determine the image editor's Url.
// const BASE_URL = 'http://127.0.0.1:5500';
const BASE_URL = 'https://imgbar.lol';

/**
 * Called when the item has been created, or when creation failed due to an error. We'll just log success/failure here.
 */
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log('Item created successfully');
  }
}

/**
 * Called when the 'Edit' item is clicked on an image. Opens the Imgbar image editor with the image url in query params.
 * @param {string} imageUrl
 */
async function openImageEditor(imageUrl) {
  const newUrl = `${BASE_URL}/?image=${encodeURIComponent(imageUrl)}`;
  browser.tabs.create({ url: newUrl });
}

// Create the context menu item.
browser.contextMenus.create({
  id: 'imgbar-edit',
  title: 'Edit with Imgbar',
  contexts: ['image'],
});

// Register the click event listener and perform the appropriate action given the ID of the context menu.
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'imgbar-edit':
      openImageEditor(info.srcUrl);
  }
});
