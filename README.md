# Deployment

- AWS Signup
- Launch instance
- Create a key value pair
- Modify permissions of pem file
- On windows
  - icacls.exe your_key_name.pem /reset
  - icacls.exe your_key_name.pem /grant:r %username%:(R)
  - icacls.exe your_key_name.pem /inheritance:r
  - connect to the maching using:
    - ssh -i "codemate-secret.pem" ubuntu@ec2-3-108-220-117.ap-south-1.compute.amazonaws.com
  - check node version in local
  - install same version in cloud (22.13.0 in my case)
  - clone the backend and frontend repos
  - deploy the frontend first
