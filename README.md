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
  - Modify the Base URLs in the files to "/api"

  ## Adding custom domain name

  - Purchased from GoDaddy
  - Signed up on Cloudflare
  - Changed the nameservers
  - Wait for nameserver updation
  - Create DNS A record pointing to the AWS Instance's IP Address
  - Enable SSL Security (Flexible)

# Additionals

- If the `location.hostname` is localhost, then Backend URL should be set to `localhost:5000` else `/api`

- nginx 404 error : change the `location` filed in sudo nano /etc/nginx/sites-available/default to serve index.html if route not available

# Sending Emails via SES

- Create a IAM User
- Give AmazonSESfullaccess to the user
- Create an identity in Amazon SES
- Verify domain name
- Verfify email address
- Install AWS SDK v3
- Code Example: https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/src/ses_sendemail.js
- Setup SES Client
- Create secruity credentials from IAM to get the access key and secret key
- Add credentials to env file
- Write code for sesclient (sesClient.ts)
- Write code for sending email (sendEmail.ts)
- Make the email dynamic (the emails (from and to both) should be verified)
