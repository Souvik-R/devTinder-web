# devTinder

- Create a Vite & React application
- Remove unnecessary code and create a Hello World app
- Install Tailwind css
- Install Daisy UI
- Add Navbar component to App.jsx
- create a Navbar.jsx to separate component file
- Install react router dom
- Create BrowserRouter => Routes => Route=/ Body > RouteChildren
- Create an Outlet in your body component
- Create a Footer
- Install axios
- CORS - install cors in backend => add middleware with configurations: origin, credentials: true
- Whenever you are making an API call so pass axios => { withCredentials: true }
- npm install @reduxjs/toolkit react-redux - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add reducer to store.
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- Navbar should update as soon as users logs in 
- Refactor our code to add constants file + create a components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout feature
- Get the feed and add the feed in the store
- build the user card on feed
- Edit profile feature
- Show toast message on save profile
- New Page - See all my connections
- New Page - See all my connections requests
- Feature - Accept/Reject connection requests
- Send/ignore user card from feed
- Sign up New User
- E2E testing

# Deployment
 - Sign up on AWS
 - Launch instance
 - chmod 400 <secret>.pem
 - ssh -i "RoyTinder-secret.pem" ubuntu@ec2-3-6-126-228.ap-south-1.compute.amazonaws.com
 - Install Node version 18.20.2
 - Gil clone
 - Frontend
    - npm install --> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to /var/www/html
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance
- Backend
    - allowed ec2 instance public IP on mongodb server
    - npm install pm2 -g
    - pm2 start npm --name "royTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"


# Nginx config:

    Frontend = http://3.6.126.228/
    Backend = http://3.6.126.228:3000/

    Domain name = roytinder.com => 3.6.126.228

    Frontend = roytinder.com
    Backend = roytinder.com:3000 => roytinder.com/api

    nginx config : 

    server_name 3.6.126.228;

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }