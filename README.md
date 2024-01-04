## RESTAURANT MENU APP

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


The project was built using and App Wrapper component outside the general elements cause i needed to use some informations that came from redux to set initial css variables and data for the project.


The main page of the project is the **Menu**, that is where i order and see the menu. Besides that i have the **Entry** that is basically the login page that is always going to redirect me to the Menu page, and **Contact** that is a page with some fake contact data.


I have defined some css variables according to the information requested by the provided endpoint.


I am using Redux to manage the global state and have the following slices:
   - **checkout**: Where i am defining the selected elements by the user
   - **menu**: All the data here is defined through an endpoint request made in the beggining of the app ( Defines the menu informations )
   - **modal**: Slice to toggle the component and get the modal visibility
   - **order**: Just set the current item that i'm adding to my basket
   - **restaurant**: All the data here is also defined by an endpoint request made in the beggining of the app ( Defines the restaurant informations )


For the styles inside the app i'm using [tailwind css](https://tailwindcss.com/docs/installation)


In the app you should be able to select english or portuguese as the main language. i am setting the initial language using the response that i got from the restaurant endpoint, where they pass the locale. 


For the translations i'm using i18next and some other tools. Besides that i've defined a locale dictionary to translate the phrases and words from the app.


I've bult some unit tests for some components using Jest


# Install the app
   1. Clone the repository: `git clone https://github.com/matheusvoriboli/restaurant-menu.git`
   2. Enter in the directory: `cd restaurant-menu`
   3. Install the dependencies
   4. Run the projeto: `npm run dev`
   5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Run the tests
   1. Inside the directory run: `npm test`

