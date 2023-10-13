-- Create tenant database
CREATE DATABASE TENANTDB;

-- Create tenant user
CREATE USER TENANTUSER WITH PASSWORD 'TENANTPW';
GRANT ALL PRIVILEGES ON DATABASE "TENANTDB" TO TENANTUSER;

-- Connect to tenant database
\c TENANTDB

-- Give all permissions to the tenant user
GRANT ALL ON SCHEMA public TO TENANTUSER;
ALTER DATABASE TENANTDB OWNER TO TENANTUSER;
