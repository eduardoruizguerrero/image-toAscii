# image-toAscii  
Convert your images into ASCII art quickly and with full customization.

## Key Features  
- **Instant conversion:** Upload any image and transform it into ASCII in seconds.  
- **Real-time editing:** Change characters and image size without reloading the page or re-uploading the image.  
- **Copy and download:** Copy the generated ASCII art or download it directly as an image.  
- **Optimized and scalable code:**  
  - The values SizeRange **`Min`**, **`Max`** and **`Step`** are now centralized in a single constant, improving code scalability and maintainability.  
  - The **`chars`** constant follows the same methodology for easier modification and reuse.
  - I improved the **`sizeHeight`** and **`sizeWidth`** algorithms so that they work dynamically.

## Customization  
- Edit **`chars`** to define which characters are used in the ASCII representation.  
- Adjust **`sizeWidth`** and **`sizeHeight`** to control resolution. Keep the 1:2 (for example: sizeWidth value = 20, sizeHeight value = 40) aspect ratio for the best results.  

## Improvements  
- Optimized code structure for better performance.  
- Dynamic editing without page refresh.  
- Direct ASCII image download capability.  

Thank you for using **image-toAscii**.
