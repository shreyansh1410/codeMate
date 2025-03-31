# Deployment

- AWS Signup

- Launch instance

- Create a key value pair

- Modify permissions of pem file

- On windows

  - icacls.exe your_key_name.pem /reset
  - icacls.exe your_key_name.pem /grant:r %username%:(R)
  - icacls.exe your_key_name.pem /inheritance:r

- Connect to the maching using:
- ssh -i "codemate-secret.pem" ubuntu@ec2-3-108-220-117.ap-south-1.compute.amazonaws.com

- Check node version in local

- Install same version in cloud (22.13.0 in my case)

- Clone the backend and frontend repos

- Deploy the frontend first

  - install the frontend dependencies (`npm i`)
  - run the build command (`npm run build`)
  - update system and install nginx (`sudo install nginx`)
  - start nginx (`sudo systemctl start nginx`)
  - enable nginx (`sudo systemctl enable nginx`)
  - copy build files (from dist folder) to nginx (`sudo scp -r dist/* /var/www/html`)
  - enable port 80 of the instance

- Deploying the backend now:

  - Ensure the env files are exposed (for now)
  - Whitelist the EC2 instance IPV4 address in the MongoDB Server
  - Install pm2 (`npm i pm2 -g`)
  - `pm2 start npm -- start` to start the process
  - `pm2 logs` to see the logs
  - `pm2 flush <name>` to flush the logs
  - `pm2 list` to list all services
  - `pm2 stop <name>` to stop service
  - `pm2 delete <name>` to delete service
  - ` pm2 start npm --name "codemate-backend" -- start` to start with custom name
  - config nginx using `sudo nano /etc/nginx/sites-available/default`
  - nginx config :
    - server_name: 3.108.220.117
    - location /api/ {
        - proxy_pass http://127.0.0.1:5000/;
        - proxy_set_header Host $host;
        - proxy_set_header X-Real-IP $remote_addr;
        - proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        - proxy_set_header X-Forwarded-Proto $scheme;
    - }
  - Restart nginx using `sudo systemctl restart nginx`
