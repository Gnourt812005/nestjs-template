#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}    NestJS Database Setup Script     ${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""

echo -e "${YELLOW}Select Database/ORM:${NC}"
echo "1) MongoDB (Mongoose)"
echo "2) MongoDB (@nestjs/mongoose)"
echo "3) Prisma ORM"
echo "4) Redis (ioredis)"
echo "5) GraphQL with Neo4j"
echo "6) Elasticsearch"
echo "7) Install Multiple"
echo "8) Exit"
echo ""

read -p "Enter your choice (1-8): " choice

case $choice in
  1)
    echo -e "${GREEN}Installing MongoDB with Mongoose...${NC}"
    yarn add mongoose
    yarn add -D @types/mongoose
    echo -e "${GREEN}✓ Mongoose installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import * as mongoose from 'mongoose';"
    echo ""
    echo "// In main.ts or app.module.ts:"
    echo "mongoose.connect('mongodb://localhost:27017/mydb');"
    echo ""
    echo "// Or use ConfigModule:"
    echo "import { ConfigModule } from '@nestjs/config';"
    ;;
  2)
    echo -e "${GREEN}Installing @nestjs/mongoose...${NC}"
    yarn add @nestjs/mongoose mongoose
    echo -e "${GREEN}✓ @nestjs/mongoose installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { MongooseModule } from '@nestjs/mongoose';"
    echo ""
    echo "// In app.module.ts:"
    echo "@Module({"
    echo "  imports: ["
    echo "    MongooseModule.forRoot('mongodb://localhost:27017/mydb'),"
    echo "  ],"
    echo "})"
    echo ""
    echo "// In feature module:"
    echo "import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';"
    echo ""
    echo "@Schema()"
    echo "export class Cat {"
    echo "  @Prop()"
    echo "  name: string;"
    echo "}"
    echo ""
    echo "export const CatSchema = SchemaFactory.createForClass(Cat);"
    ;;
  3)
    echo -e "${GREEN}Installing Prisma...${NC}"
    yarn add @prisma/client
    yarn add -D prisma
    echo -e "${GREEN}✓ Prisma installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Initializing Prisma...${NC}"
    npx prisma init
    echo ""
    echo -e "${GREEN}✓ Prisma initialized!${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Configure your database connection in .env file"
    echo "2. Define your models in prisma/schema.prisma"
    echo "3. Run: npx prisma migrate dev --name init"
    echo "4. Run: npx prisma generate"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "// Create prisma.service.ts:"
    echo "import { Injectable, OnModuleInit } from '@nestjs/common';"
    echo "import { PrismaClient } from '@prisma/client';"
    echo ""
    echo "@Injectable()"
    echo "export class PrismaService extends PrismaClient implements OnModuleInit {"
    echo "  async onModuleInit() {"
    echo "    await this.\$connect();"
    echo "  }"
    echo "}"
    ;;
  4)
    echo -e "${GREEN}Installing Redis (ioredis)...${NC}"
    yarn add ioredis
    yarn add -D @types/ioredis
    echo -e "${GREEN}✓ ioredis installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Injectable } from '@nestjs/common';"
    echo "import Redis from 'ioredis';"
    echo ""
    echo "@Injectable()"
    echo "export class RedisService {"
    echo "  private redis: Redis;"
    echo ""
    echo "  constructor() {"
    echo "    this.redis = new Redis({"
    echo "      host: 'localhost',"
    echo "      port: 6379,"
    echo "    });"
    echo "  }"
    echo ""
    echo "  async get(key: string): Promise<string | null> {"
    echo "    return await this.redis.get(key);"
    echo "  }"
    echo ""
    echo "  async set(key: string, value: string): Promise<void> {"
    echo "    await this.redis.set(key, value);"
    echo "  }"
    echo "}"
    ;;
  5)
    echo -e "${GREEN}Installing GraphQL with Neo4j...${NC}"
    yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql neo4j-driver
    yarn add -D @types/neo4j-driver
    echo -e "${GREEN}✓ GraphQL with Neo4j installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Module } from '@nestjs/common';"
    echo "import { GraphQLModule } from '@nestjs/graphql';"
    echo "import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';"
    echo "import neo4j from 'neo4j-driver';"
    echo ""
    echo "// In app.module.ts:"
    echo "@Module({"
    echo "  imports: ["
    echo "    GraphQLModule.forRoot<ApolloDriverConfig>({"
    echo "      driver: ApolloDriver,"
    echo "      autoSchemaFile: 'schema.gql',"
    echo "    }),"
    echo "  ],"
    echo "})"
    echo ""
    echo "// Neo4j connection:"
    echo "const driver = neo4j.driver("
    echo "  'bolt://localhost:7687',"
    echo "  neo4j.auth.basic('neo4j', 'password')"
    echo ");"
    ;;
  6)
    echo -e "${GREEN}Installing Elasticsearch...${NC}"
    yarn add @elastic/elasticsearch
    yarn add -D @types/elastic__elasticsearch
    echo -e "${GREEN}✓ Elasticsearch installed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { Injectable } from '@nestjs/common';"
    echo "import { Client } from '@elastic/elasticsearch';"
    echo ""
    echo "@Injectable()"
    echo "export class ElasticsearchService {"
    echo "  private client: Client;"
    echo ""
    echo "  constructor() {"
    echo "    this.client = new Client({"
    echo "      node: 'http://localhost:9200',"
    echo "    });"
    echo "  }"
    echo ""
    echo "  async search(index: string, query: any) {"
    echo "    const result = await this.client.search({"
    echo "      index,"
    echo "      body: {"
    echo "        query,"
    echo "      },"
    echo "    });"
    echo "    return result.hits.hits;"
    echo "  }"
    echo "}"
    ;;
  7)
    echo -e "${YELLOW}Select databases to install (space-separated numbers, e.g., '1 3 4'):${NC}"
    echo "1) MongoDB (Mongoose)"
    echo "2) MongoDB (@nestjs/mongoose)"
    echo "3) Prisma ORM"
    echo "4) Redis (ioredis)"
    echo "5) GraphQL with Neo4j"
    echo "6) Elasticsearch"
    echo ""
    read -p "Enter your choices: " -a choices
    
    packages=""
    dev_packages=""
    init_prisma=false
    
    for c in "${choices[@]}"; do
      case $c in
        1)
          packages="$packages mongoose"
          dev_packages="$dev_packages @types/mongoose"
          ;;
        2)
          packages="$packages @nestjs/mongoose mongoose"
          ;;
        3)
          packages="$packages @prisma/client"
          dev_packages="$dev_packages prisma"
          init_prisma=true
          ;;
        4)
          packages="$packages ioredis"
          dev_packages="$dev_packages @types/ioredis"
          ;;
        5)
          packages="$packages @nestjs/graphql @nestjs/apollo @apollo/server graphql neo4j-driver"
          dev_packages="$dev_packages @types/neo4j-driver"
          ;;
        6)
          packages="$packages @elastic/elasticsearch"
          dev_packages="$dev_packages @types/elastic__elasticsearch"
          ;;
        *)
          echo -e "${RED}Invalid choice: $c${NC}"
          ;;
      esac
    done
    
    if [ -n "$packages" ]; then
      echo -e "${GREEN}Installing selected databases...${NC}"
      yarn add $packages
      if [ -n "$dev_packages" ]; then
        yarn add -D $dev_packages
      fi
      if [ "$init_prisma" = true ]; then
        echo -e "${YELLOW}Initializing Prisma...${NC}"
        npx prisma init
      fi
      echo -e "${GREEN}✓ All selected databases installed successfully!${NC}"
    else
      echo -e "${RED}No valid databases selected.${NC}"
    fi
    ;;
  8)
    echo -e "${YELLOW}Exiting without installing databases.${NC}"
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid choice. Please run the script again.${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}   Database setup completed!         ${NC}"
echo -e "${GREEN}=====================================${NC}"
