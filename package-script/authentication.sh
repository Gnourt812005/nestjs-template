#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}  NestJS Authentication Setup Script ${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""

echo -e "${YELLOW}Select Authentication Strategy:${NC}"
echo "1) JWT Authentication"
echo "2) Local (Username/Password) Authentication"
echo "3) OAuth2 (Google, Facebook, GitHub)"
echo "4) JWT + Local (Combined)"
echo "5) Complete Auth Setup (JWT + Local + OAuth2)"
echo "6) Session-based Authentication"
echo "7) API Key Authentication"
echo "8) Exit"
echo ""

read -p "Enter your choice (1-8): " choice

case $choice in
  1)
    echo -e "${GREEN}Installing JWT Authentication...${NC}"
    yarn add @nestjs/jwt @nestjs/passport passport passport-jwt
    yarn add -D @types/passport-jwt
    echo -e "${GREEN}✓ JWT Authentication installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "// In auth.module.ts:"
    echo "import { JwtModule } from '@nestjs/jwt';"
    echo ""
    echo "JwtModule.register({"
    echo "  secret: 'YOUR_SECRET_KEY',"
    echo "  signOptions: { expiresIn: '1h' },"
    echo "});"
    ;;
  2)
    echo -e "${GREEN}Installing Local Authentication...${NC}"
    yarn add @nestjs/passport passport passport-local bcrypt
    yarn add -D @types/passport-local @types/bcrypt
    echo -e "${GREEN}✓ Local Authentication installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "// Create local.strategy.ts:"
    echo "import { Strategy } from 'passport-local';"
    echo "import { PassportStrategy } from '@nestjs/passport';"
    echo ""
    echo "// Hash password:"
    echo "import * as bcrypt from 'bcrypt';"
    echo "const hashedPassword = await bcrypt.hash(password, 10);"
    ;;
  3)
    echo -e "${GREEN}Installing OAuth2 Authentication...${NC}"
    yarn add @nestjs/passport passport passport-google-oauth20 passport-facebook passport-github2
    yarn add -D @types/passport-google-oauth20 @types/passport-facebook @types/passport-github2
    echo -e "${GREEN}✓ OAuth2 providers installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Providers installed:${NC}"
    echo "- Google OAuth2"
    echo "- Facebook OAuth2"
    echo "- GitHub OAuth2"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "// In google.strategy.ts:"
    echo "import { Strategy } from 'passport-google-oauth20';"
    echo "import { PassportStrategy } from '@nestjs/passport';"
    ;;
  4)
    echo -e "${GREEN}Installing JWT + Local Authentication...${NC}"
    yarn add @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcrypt
    yarn add -D @types/passport-jwt @types/passport-local @types/bcrypt
    echo -e "${GREEN}✓ JWT + Local Authentication installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}This setup includes:${NC}"
    echo "- JWT tokens for API authentication"
    echo "- Local username/password login"
    echo "- Password hashing with bcrypt"
    ;;
  5)
    echo -e "${GREEN}Installing Complete Authentication Setup...${NC}"
    yarn add @nestjs/jwt @nestjs/passport passport passport-jwt passport-local passport-google-oauth20 passport-facebook passport-github2 bcrypt
    yarn add -D @types/passport-jwt @types/passport-local @types/passport-google-oauth20 @types/passport-facebook @types/passport-github2 @types/bcrypt
    echo -e "${GREEN}✓ Complete Authentication stack installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Installed packages:${NC}"
    echo "✓ JWT Authentication"
    echo "✓ Local Authentication"
    echo "✓ Google OAuth2"
    echo "✓ Facebook OAuth2"
    echo "✓ GitHub OAuth2"
    echo "✓ Bcrypt for password hashing"
    ;;
  6)
    echo -e "${GREEN}Installing Session-based Authentication...${NC}"
    yarn add @nestjs/passport passport passport-local express-session bcrypt
    yarn add -D @types/passport-local @types/express-session @types/bcrypt
    echo -e "${GREEN}✓ Session-based Authentication installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "// In main.ts:"
    echo "import * as session from 'express-session';"
    echo ""
    echo "app.use(session({"
    echo "  secret: 'YOUR_SECRET_KEY',"
    echo "  resave: false,"
    echo "  saveUninitialized: false,"
    echo "}));"
    ;;
  7)
    echo -e "${GREEN}Installing API Key Authentication...${NC}"
    yarn add @nestjs/passport passport passport-headerapikey
    yarn add -D @types/passport
    echo -e "${GREEN}✓ API Key Authentication installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "// Create api-key.strategy.ts:"
    echo "import { HeaderAPIKeyStrategy } from 'passport-headerapikey';"
    echo "import { PassportStrategy } from '@nestjs/passport';"
    echo ""
    echo "// Validate API key from header:"
    echo "validate(apiKey: string, done: Function) {"
    echo "  if (apiKey === process.env.API_KEY) {"
    echo "    return done(null, true);"
    echo "  }"
    echo "  return done(null, false);"
    echo "}"
    ;;
  8)
    echo -e "${YELLOW}Exiting without installing authentication packages.${NC}"
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid choice. Please run the script again.${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}  Authentication setup completed!    ${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo -e "${YELLOW}Don't forget to:${NC}"
echo "1. Configure environment variables for secrets"
echo "2. Create guard files (jwt.guard.ts, local.guard.ts)"
echo "3. Create strategy files for each authentication method"
echo "4. Set up AuthModule with proper imports"