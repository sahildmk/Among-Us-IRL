import sys;
import json;
import random;

# sahil mehak eshaa rishav anoushka vijaishree sahana ankit

if __name__ == "__main__":
    names = input("Enter names separated with spaces: ").split(' ')
    roleList = random.sample(range(0, len(names)), 2)
    dbJsonFile = {
        "users": []
    }

    dbJsonFile['users'].append(
        {
            "id": "admin",
            "password": "2709",
            "role": "admin",
            "alive": True
        }
    )

    for i in range(0, len(names)):
        newObject = {
            "id": names[i],
            "password": str(random.randint(1000,9999)),
            "role": ("Impostor" if (i in roleList) else "Crewmate"),
            "alive": "alive"
        }
        dbJsonFile['users'].append(newObject);
        # jsonObject = json.dumps(newObject, indent=4)
        # print(jsonObject)

    
    
    with open("db.json", "w") as outFile:
        json.dump(dbJsonFile, outFile, indent=4)
    # print(jsonList)

