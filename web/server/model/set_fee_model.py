
def set_fee(array):
    code_fee_ = {
        100000 : 0,
        50000 : 20,
        30000 : 40,
        20000 : 60,
        10000 : 80,
        5000 : 100,
        3000 : 120,
        2000 : 140,
        1000 : 160,
        500 : 180,
        0 : 200
    }

    ### 거리별  세분화
    distance_fee_ = {
        400 : 500,
        300 : 400,
        100 : 300,
        50 : 200,
        0 : 0
    }

    ### 시간별 세분화
    time_fee_ = {
        400 : [1, 2, 11, 12, 13],
        200 : [0, 3, 4, 10, 14],
        100 : [5, 6, 7, 8, 9, 15, 23],
        0 : [16, 17, 18, 19, 20, 21, 22]
    }

    distance = array[0]
    time = array[1]
    quantity = array[2]
    
    code_fee_key = list(code_fee_.keys())

    distance_fee_key = list(distance_fee_.keys())
    time_fee_key = list(time_fee_.keys())

    distance_weight = -1 
    time_weight = -1
    quantity_weight = -1

    ## quantity_weight
    if quantity >= 100000:
        quantity_weight = 0

    else:
        for i in range(len(code_fee_key) -1 ):
            if (code_fee_key[i] > quantity) and (code_fee_key[i+1] <= quantity):
                quantity_lower = code_fee_key[i+1]
                quantity_upper = code_fee_key[i]

                quantity_weight = code_fee_[quantity_lower] + 20 * (quantity - quantity_lower) / (quantity_upper - quantity_lower)

    distance_fee_ = {
        400 : 500,
        300 : 400,
        100 : 300,
        50 : 200,
        0 : 0
    }

    ## distance_weight
    if distance >= 400:
        distance_weight = 400
    else:
        for i in range(len(distance_fee_key) -1 ):
            if (distance_fee_key[i] > distance) and (distance_fee_key[i+1] <= distance):
                distance_lower = distance_fee_key[i+1]
                distance_upper = distance_fee_key[i]


                distance_weight = distance_fee_[distance_lower] + (distance_fee_[distance_upper] - distance_fee_[distance_lower]) * (distance - distance_lower) / (distance_upper - distance_lower)

    ## time_weight
    for i in time_fee_key:
        if time in time_fee_[i]:
            time_weight = i

    total = int(distance_weight) + int(time_weight) + int(quantity_weight)
    return int(distance_weight), int(time_weight), int(quantity_weight), total